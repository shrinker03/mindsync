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
