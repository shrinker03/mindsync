# MindSync — Build Plan

A checkpoint-based build log. Each milestone is a `/compact` boundary:
finish the milestone, verify, commit, then `/compact` before starting the next.

**Why compact at milestone boundaries?** After a milestone ships, the
exploration that got us there (failed approaches, read files, intermediate
code) is mostly noise. `/compact` preserves the summary, drops the scratch work.

---

## M0 — Scaffolding  ✅
- Create folder tree per plan
- Root `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`
- Write root/app/server CLAUDE.md, `.claudeignore`, this BUILDPLAN.md
- `pnpm install` at root succeeds
- Commit: `chore: scaffold monorepo`

**Verify:** `ls` shows expected layout; `pnpm install` succeeds; `pnpm -r typecheck` runs against `packages/shared`.
**→ /compact**

## M1 — RN boot  ✅
- Initialize RN 0.76+ inside `app/` with `npx @react-native-community/cli init`
- Enable New Architecture in `android/gradle.properties`
- Convert to TS strict, wire Zustand, Metro config for pnpm symlinks
- Dummy screen renders "MindSync" on device
- Commit: `feat(app): initial RN scaffold with new architecture`

**Verify:** `pnpm --filter @mind-sync/app android` boots app on device.
**→ /compact**

## M2 — Android permissions + permissions UI  ✅
- Declare `READ_SMS`, `READ_CALL_LOG`, `RECEIVE_SMS`, `POST_NOTIFICATIONS`,
  `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_DATA_SYNC` in AndroidManifest
- Permission-request screen: request each, show grant state
- `usePermissionsStore` (Zustand) tracks current state
- Commit: `feat(app): permissions flow`

**Verify:** Install on fresh device, grant one by one, state reflects reality.
**→ /compact**

## M3 — NotificationListenerService (Kotlin)  ✅
- `NotificationListenerModule.kt` as a TurboModule
- Foreground service with persistent notification ("MindSync is capturing")
- User opens system settings to grant listener access
- Emit events to JS for each posted notification (payload: app pkg, title, text, timestamp)
- `src/native/NotificationListener.ts` wrapper
- Commit: `feat(app): notification listener native module`

**Verify:** Trigger WhatsApp notification → logcat shows it → JS event fires.
**→ /compact**

## M4 — SMS + Call log readers (Kotlin)  ✅
- `SmsReaderModule.kt`: ContentResolver query on `content://sms`
- `CallLogReaderModule.kt`: ContentResolver query on `CallLog.Calls.CONTENT_URI`
- Both return `Promise<Envelope[]>` with pagination (cursor by `_id`)
- TS wrappers in `src/native/`
- Commit: `feat(app): SMS and call-log readers`

**Verify:** Call wrappers from dev UI, see real messages/calls.
**→ /compact**

## M5 — SQLite schema (op-sqlite + Drizzle) + writes  ✅
- Install `@op-engineering/op-sqlite`, `drizzle-orm`, `drizzle-kit`
- `src/db/schema.ts`: tables `notifications`, `sms_messages`, `call_entries`, `sync_cursors`
- Unique index on `(source, external_id)` per capture table
- `drizzle.config.ts` → `drizzle-kit generate` → `src/db/migrations/`
- On app boot: open DB → run bundled migrations via `migrate()` → hydrate stores
- Services: `notificationCapture.ts`, `smsSync.ts`, `callSync.ts` receive
  native events and write via Drizzle; maintain `sync_cursors` rows.
- Commit: `feat(app): local DB + capture services`

**Verify:** Trigger capture → row count in DB increases → re-running doesn't double-insert (unique index enforces idempotency).
**→ /compact**

## M6 — Server scaffold  ✅
- Express + tsx + Prisma + pino
- Postgres schema mirrors app tables + `source`, `external_id`, `received_at`
- `GET /api/health` responds 200
- `.env.example` with `DATABASE_URL`, `SYNC_BEARER_TOKEN`
- Commit: `feat(server): initial scaffold`

**Verify:** `pnpm --filter @mind-sync/server dev` serves health check.
**→ /compact**

## M7 — Auth + sync endpoints  ✅
- `requireBearer` middleware
- `POST /api/sync/:type` for `sms | call | notification`
- Validate with Zod from `@mind-sync/shared`
- Dedupe via Prisma `createMany({ skipDuplicates: true })`
- Response: `{ accepted, duplicates }`
- Commit: `feat(server): sync endpoints with auth`

**Verify:** `curl` with bearer posts envelope → visible in `prisma studio`; second `curl` returns `duplicates: 1`.
**→ /compact**

## M8 — Sync client (app side)  ✅
- `src/services/sync/syncRunner.ts` — read unsynced rows, POST, advance cursor
- Retry with exponential backoff on network errors
- Background trigger: `HeadlessJsTaskService` via WorkManager every 15 min
- Commit: `feat(app): background sync runner`

**Verify:** Airplane mode → capture → toggle off → server receives batch.
**→ /compact**

## M9 — Release APK + sideload  ✅
- Android signing config (keystore stored outside repo)
- `pnpm android:release` produces signed APK
- Document install steps in `README.md`
- Commit: `chore: release build configuration`

**Verify:** APK installs on clean device, grants permissions, syncs.
**→ /compact**

## M10 — Observability  ✅
- Server: pino transport + simple log rotation
- App: `src/services/log.ts` with in-DB circular buffer (last 500 entries)
- Dev screen to browse recent logs
- Commit: `feat: observability basics`

**Verify:** Error in sync appears in app log screen + server log file.
**→ /compact — project ships.**

---

## M11 — Real-time capture + boot persistence  ✅
- `SmsReceiver` (BroadcastReceiver on `SMS_RECEIVED`) — kicks `SyncTaskService` for
  reconcile on every incoming SMS instead of relying on the 15-min poll.
- `CallLogObserver` (ContentObserver on `CallLog.Calls.CONTENT_URI`) — same for calls.
- `BootReceiver` — re-enqueues periodic WorkManager job after `BOOT_COMPLETED`,
  `MY_PACKAGE_REPLACED`, and `QUICKBOOT_POWERON`; also fires an immediate sync.
- `BatteryOptimizationModule` — TurboModule wrapping
  `Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS`; required on Xiaomi/OnePlus/Oppo/Realme.
- Commit: `feat(app): real-time capture, boot persistence, battery exemption` (part of `43340a4`)

**Verify:** Capture latency drops to <1s for SMS/calls; reboot the phone, wait 5 min, confirm rows still flowing.
**→ /compact**

## M12 — Runtime config + tabbed UI + notif filter  ✅
- `runtimeConfig.ts` — AsyncStorage-backed `serverUrl` + `bearerToken`, cached on
  first read. Lets the user point the app at a new server without rebuilding.
- `HomeScreen` / `SettingsScreen` / tab bar in `App.tsx` — replaces the dev cards
  in PermissionsScreen with a real navigation surface.
- `notificationFilter.ts` — per-app denylist stored in AsyncStorage; consulted by
  `notificationCapture` before insert.
- Commit: `feat(app): real-time capture, runtime config, and tabbed UI` (`43340a4`)

**Verify:** Change server URL in Settings → "Test connection" → 200; deny an app's
package → no rows from it accumulate.
**→ /compact**

## M13 — Notification deduplication  ✅
- Kotlin `MindSyncNotificationListenerService`: `LruCache(256)` on `(sbn.key →
  contentHash)` — drops reposts whose `(pkg|title|text)` is unchanged before
  they cross the JS bridge. Adds `sbn.key` to the emitted payload.
- TS `notificationCapture.ts`: external_id changed from `${pkg}:${timestamp}`
  to a 16-char FNV-1a hash of `pkg|key|title|text`. Same content from same
  notif key → same id → existing unique index dedupes.
- No schema change; no migration of historical dupes (going-forward only).
- Commit: `fix(app): dedupe notifications by content + sbn.key`

**Verify (via adb):** `cmd notification post -t 'X' tagX 'msg' × 5` → 1 row;
3 different `tagX/Y/Z` → 3 rows; same tag with changing text × 3 → 3 rows.
**→ /compact**

## M14 — Server visualizer (read-only)  ✅
- New routes in `server/src/routes/data.ts`:
  - `GET /api/data/sms?cursor&limit&q`
  - `GET /api/data/calls?cursor&limit&q`
  - `GET /api/data/notifications?cursor&limit&q&pkg`
  - `GET /api/data/notifications/pkgs` (Prisma `groupBy` aggregate)
- All return `{ items, nextCursor }`; cursor-based pagination on `id desc`.
- `BigInt.prototype.toJSON` shim in `server/src/index.ts` so Prisma BigInt
  columns serialize as strings (Vercel-compatible).
- Static UI in `server/public/` — vanilla JS (no framework), login overlay
  (token in localStorage), three tabs, search, per-app sidebar with counts,
  lazy-load on scroll, dark/light via `prefers-color-scheme`.
- Field rendering: `Intl.DateTimeFormat` for dates, SMS/Call type ints decoded
  to labels (Inbox/Sent/Incoming/Missed/…), call duration as `m:ss`, common
  Android pkgs mapped to friendly names (WhatsApp, Telegram, Gmail, …).
- Commit: `feat(server): read-only visualizer with rich field rendering`

**Verify:** `pnpm --filter @mind-sync/server dev`; open `http://localhost:3000/`,
paste bearer, see three tabs with formatted data; search "OTP" narrows SMS;
pkg sidebar filters notifications.
**→ /compact**

## M15 — Remote deployment (Vercel + Neon)  ⬜
- Extract Express app: `server/src/app.ts` (default export) + thin
  `server/src/index.ts` for local dev (`app.listen`).
- `server/api/index.ts` — Vercel function entrypoint that re-exports `app`.
- `server/vercel.json` — `@vercel/node` builder, rewrite all paths → `/api/index`.
- `server/src/log.ts` — when `process.env.VERCEL === '1'`, skip the file
  transport (read-only filesystem on Vercel); stdout pino transport stays.
- `server/package.json` — `vercel-build` + `postinstall` run `prisma generate`.
- Database: Neon free tier (no CC). One-time `prisma migrate deploy` against
  the Neon URL from local before first deploy.
- App side: Settings tab → set server URL to `https://<project>.vercel.app`,
  paste token, "Test connection". No code change in app.
- README: deployment runbook.
- Commit: `feat: deploy server to Vercel + Neon` + `docs: deployment runbook`

**Verify:** Push to `main` → Vercel auto-deploys; phone hits Vercel URL; rows
land in Neon Postgres; shut down local server, sync still works.
**→ /compact — remote ship.**

---

## Compact-checkpoint discipline
1. Milestone done → verify → commit.
2. `/compact` (not `/clear`) — preserves the summary for next session.
3. In the next session's first message, state the next milestone ID; Claude
   will pull M<N>-relevant context only.
4. If a milestone balloons past one session, split it. Don't let a single
   milestone span two compactions.
