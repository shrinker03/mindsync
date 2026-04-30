# MindSync

Personal Android app capturing SMS, call logs, and WhatsApp notifications,
syncing to a self-hosted server. Side-loaded (no Play Store).

## Monorepo layout
- `app/` — React Native 0.76+ (New Arch) Android app. See `app/CLAUDE.md`.
- `server/` — Node + Express + Prisma + PostgreSQL. See `server/CLAUDE.md`.
- `packages/shared/` — Zod schemas + TS types for sync protocol. Imported
  as `@mind-sync/shared` by both app and server.

**When working inside a package, read that package's CLAUDE.md first.**
Don't hold server context while editing Kotlin; don't hold Kotlin context
while editing Prisma migrations.

## Commands (from root)
- `pnpm install` — install all workspaces
- `pnpm -r build` — build everything
- `pnpm -r typecheck` — typecheck everything
- `pnpm --filter @mind-sync/server dev` — run server (tsx watch)

## Android build (always use PowerShell — Bash can't run `.bat`)

**Before every build:** check free space. This machine fills up fast; Gradle needs ≥ 3 GB.
```powershell
Get-PSDrive C | ForEach-Object { "Free: {0:N1} GB" -f ($_.Free/1GB) }
```

**If < 3 GB free, clean first:**
```powershell
Remove-Item -Recurse -Force "$env:USERPROFILE\.gradle\caches\build-cache-*" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$env:USERPROFILE\.gradle\daemon" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$env:APPDATA\npm-cache" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "app\android\app\build" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "app\android\build" -ErrorAction SilentlyContinue
pnpm store prune
```

**Build + install on device (two PowerShell tabs):**
```powershell
# Tab 1 — Metro bundler
pnpm --filter @mind-sync/app start

# Tab 2 — Gradle install
cd app\android
.\gradlew.bat app:installDebug -PreactNativeDevServerPort=8081
```

## Conventions (cross-cutting)
- TypeScript strict everywhere (see `tsconfig.base.json`). No `any` without
  `// eslint-disable` + reason.
- Sync protocol lives in `packages/shared`. If app and server diverge on a
  field, change `shared` first and let types propagate.
- Conventional commits (`feat:`, `fix:`, `chore:`).
- No Play Store — don't add Firebase, FCM, Crashlytics, or store-dependent code.

## Gotchas
- pnpm + RN Metro: `app/metro.config.js` must declare `watchFolders` for the
  workspace root and `packages/shared`. If Metro can't resolve `@mind-sync/shared`,
  that file is the fix — not `nohoist`.
- Android-only. There is no `ios/` directory and no plan to add one.

## Build plan & checkpoints
See `BUILDPLAN.md`. Each milestone is a `/compact` boundary — verify, commit,
compact, then start the next. Don't let a milestone span two compactions.
