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

**Check your local IP first** — the machine uses DHCP:
```powershell
ipconfig | Select-String "IPv4"
```
If it changed, update `app/src/services/sync/syncConfig.ts` → `SYNC_SERVER_URL` before building.

**Then start everything (three PowerShell tabs):**
```powershell
# Tab 1 — server (wait for "mind-sync server listening")
pnpm --filter @mind-sync/server dev

# Tab 2 — Metro bundler, debug only (wait for "Metro waiting on port 8081")
pnpm --filter @mind-sync/app start

# Tab 3 — install debug APK on device
cd app\android
.\gradlew.bat app:installDebug -PreactNativeDevServerPort=8081
```

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
