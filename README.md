# MindSync

Personal Android app capturing SMS, call logs, and WhatsApp notifications,
syncing to a self-hosted Node server. Side-loaded — no Play Store.

See [`BUILDPLAN.md`](./BUILDPLAN.md) for the session-by-session plan and
[`CLAUDE.md`](./CLAUDE.md) for project conventions.

## Layout
- `app/` — React Native 0.76+ Android app (Zustand, op-sqlite + Drizzle)
- `server/` — Node + Express + Prisma + Postgres
- `packages/shared/` — sync-protocol Zod schemas and TS types

## Quick start
```bash
pnpm install
pnpm -r typecheck
```

## Local dev setup (full stack)

### One-time
1. Create `server/.env` from `server/.env.example` — fill in `DATABASE_URL` and `SYNC_BEARER_TOKEN`.
2. Run Prisma migrations: `cd server && npx prisma migrate deploy`
3. Add Windows firewall rule (admin PowerShell):
   ```powershell
   New-NetFirewallRule -DisplayName "MindSync Server 3000" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
   ```
4. Verify `app/android/app/src/main/AndroidManifest.xml` has `android:usesCleartextTraffic="true"` (not the `${...}` placeholder).

### Every session

**Pre-flight (one block, ~5 sec):**
```powershell
# Free space (need ≥ 3 GB; only run the cleanup block in CLAUDE.md if below)
Get-PSDrive C | ForEach-Object { "Free: {0:N1} GB" -f ($_.Free/1GB) }

# Device + USB tunnels (do BOTH ports — adb daemon restart wipes these)
adb devices
adb reverse tcp:8081 tcp:8081  # Metro
adb reverse tcp:3000 tcp:3000  # server (lets device hit http://localhost:3000)
```

If `adb devices` shows `unauthorized`, tap **Allow** on the phone (tick "Always allow from this computer" so it sticks).

**Then start everything (three PowerShell tabs):**
```powershell
# Tab 1 — server (wait for "mind-sync server listening")
pnpm --filter @mind-sync/server dev

# Tab 2 — Metro bundler, debug only (wait for "Metro waiting on port 8081")
# Do NOT pass --reset-cache unless you've changed Metro config or hit a stale-module bug;
# a cold bundle is ~3-4 min, a warm one is ~30 sec.
pnpm --filter @mind-sync/app start

# Tab 3 — install debug APK on device
cd app\android
.\gradlew.bat app:installDebug -PreactNativeDevServerPort=8081
```

**Server URL & token live in the app at runtime, not in code.** The hardcoded
defaults in `app/src/services/sync/syncConfig.ts` are only used as a one-time
fallback the first time you launch on a fresh install. Set them via the
Settings tab on device:
- For USB-tethered dev: `http://localhost:3000` (works because of `adb reverse tcp:3000`)
- For LAN: `http://<your-laptop-ipv4>:3000` (check with `ipconfig | Select-String IPv4`)

**After an uninstall** (signature conflict between debug ↔ release, or a fresh
install), AsyncStorage is wiped and you have to re-enter URL + token in
Settings. To skip the UI flow on debug builds, drop straight into the app
DB via adb:
```powershell
adb shell run-as com.mindsync sqlite3 databases/RKStorage `
  "INSERT OR REPLACE INTO catalystLocalStorage VALUES ('mindsync.serverUrl','http://localhost:3000'), ('mindsync.bearerToken','<your-token>');"
adb shell am force-stop com.mindsync
adb shell am start -n com.mindsync/.MainActivity
```

**Pre-grant permissions on a fresh install** (saves manual UI taps):
```powershell
$pkg = "com.mindsync"
adb shell pm grant $pkg android.permission.READ_SMS
adb shell pm grant $pkg android.permission.RECEIVE_SMS
adb shell pm grant $pkg android.permission.READ_CALL_LOG
adb shell pm grant $pkg android.permission.POST_NOTIFICATIONS
adb shell cmd notification allow_listener $pkg/.modules.MindSyncNotificationListenerService
```

---

## Remote deployment (Render + Neon)

Pushes the server to Render's free tier (no CC, push-to-deploy) backed by a
Neon Postgres free-tier database. After this, the laptop doesn't need to be
on for the phone to sync.

Why Render and not Vercel: Vercel's serverless bundler (`@vercel/node` + ncc)
doesn't trace binary asset files like the Prisma engine `.node` or `.wasm`,
and it doesn't play well with `node-linker=hoisted` monorepo installs. Render
just runs `node dist/index.js` like any normal VPS — Prisma's standard install
flow works out of the box.

### One-time: Neon database

1. Sign up at [neon.tech](https://neon.tech), create a project (any region close to
   your phone). Copy the **pooled** connection string from the dashboard — it
   ends with `?sslmode=require`.
2. From the local machine, push the schema once:
   ```powershell
   cd server
   $env:DATABASE_URL = '<paste-neon-url>' ; npx prisma migrate deploy
   ```
3. Optional: paste the same URL into a temp env and run
   `npx prisma studio` to confirm tables are created (then close it).

### One-time: Render service

1. Push the repo to GitHub if it isn't already.
2. [render.com](https://render.com) → sign up with GitHub.
3. Dashboard → **New +** → **Blueprint** → connect the repo. Render auto-detects
   `render.yaml` at the root and proposes the `mindsync-server` Web Service.
4. It prompts for the two `sync: false` env vars:
   - `DATABASE_URL` = the Neon URL from above
   - `SYNC_BEARER_TOKEN` = the same token the app uses
   - (`LOG_LEVEL=info` and `NODE_VERSION=20` are pre-filled in the yaml.)
5. Click **Apply**. First build takes ~3-5 min — installs pnpm workspace,
   builds `@mind-sync/shared` then `@mind-sync/server`, starts `node dist/index.js`.
6. Once "Live", the URL is `https://<name>-<hash>.onrender.com`. Test:
   ```powershell
   $token = '<your-token>'
   Invoke-WebRequest -Uri "https://<name>-<hash>.onrender.com/api/health" `
     -Headers @{ Authorization = "Bearer $token" } -UseBasicParsing
   ```
   Should return `{"status":"ok","uptime":...}`.

### Free-tier caveat

Render's free Web Service **spins down after 15 min of inactivity**. The next
request after that pays a ~30–60s cold-start. For a 15-min sync cadence from
the phone this means the first sync after a long idle is slow but works — the
app retries on timeout. Upgrading the service to Starter ($7/mo) removes
the spin-down if you want hot syncs.

### Per change

`git push origin main` — Render auto-deploys. No other action.

### Point the phone at Render

In the app's **Settings** tab:
- Server URL: `https://<name>-<hash>.onrender.com`
- Bearer token: same as `SYNC_BEARER_TOKEN`
- **Test connection** → `200`. **Save**.

The local server can now stay off; the phone syncs to Render directly.

### Troubleshooting

- **Build fails with `ELIFECYCLE Command failed with exit code -2`:** Check
  that `.npmrc` does NOT contain `script-shell=powershell` — that breaks
  Linux builds since PowerShell isn't available.
- **Runtime `ECONNREFUSED` on data endpoints:** `DATABASE_URL` in Render's
  Environment tab is wrong. Replace with the Neon **pooled** URL (the one
  ending in `?sslmode=require`). Render auto-restarts on env change.
- **First request takes 30+ seconds:** Service was spun down (free-tier
  behaviour). Wait for cold start; subsequent requests are fast.

---

## Building a release APK

### One-time: generate signing keystore

```powershell
keytool -genkeypair -v -storetype PKCS12 `
  -keystore "$env:USERPROFILE\.android\mindsync-release.keystore" `
  -alias mindsync -keyalg RSA -keysize 2048 -validity 10000
```

### One-time: create `app/android/keystore.properties`

Copy from the example and fill in your values:

```powershell
Copy-Item app\android\keystore.properties.example app\android\keystore.properties
```

Edit `app/android/keystore.properties`:
```
storeFile=C:/Users/<YourName>/.android/mindsync-release.keystore
storePassword=<store password chosen above>
keyAlias=mindsync
keyPassword=<key password chosen above>
```

> `keystore.properties` is gitignored — never commit it.

### Build

```powershell
pnpm --filter @mind-sync/app android:release
```

APK lands at `app/android/app/build/outputs/apk/release/app-release.apk`.

## Sideloading onto a device

1. Enable **Unknown sources** (Settings → Apps → Special app access → Install unknown apps → Files/browser).
2. Copy the APK to the device:
   ```powershell
   adb push app\android\app\build\outputs\apk\release\app-release.apk /sdcard/Download/mindsync.apk
   ```
3. On device: open Files app → Downloads → `mindsync.apk` → Install.
4. Grant permissions on first launch (SMS, Call log, Notification access).
5. Set the server URL and bearer token in app Settings, then trigger a manual sync.
