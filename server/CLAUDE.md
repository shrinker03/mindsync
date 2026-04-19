# server — Node + Express + Prisma (MindSync)

Personal, single-user sync server. Not multi-tenant. Bearer-token auth.
Postgres via Prisma. TypeScript strict, ESM.

> **This workspace is scaffolded in milestone M6** (see `../BUILDPLAN.md`).
> Until then, `server/package.json` and `server/src/` don't exist yet.

## Run / build (post-M6)
- `pnpm dev` — tsx watch mode
- `pnpm build && pnpm start` — production
- `pnpm prisma migrate dev --name <n>` — create + apply migration
- `pnpm prisma studio` — inspect DB at localhost:5555

## Environment
- `.env.example` documents all vars. Required:
  - `DATABASE_URL` — postgres connection string
  - `SYNC_BEARER_TOKEN` — long random string; app sends it in `Authorization: Bearer …`
  - `PORT` (default 3000)
- Never commit `.env`. Copy to `.env` locally.

## Directory contract
- `src/routes/` — Express routers, one file per resource.
  Pattern: `/api/sync/:type` where type ∈ {sms, call, notification}.
- `src/services/` — business logic. Routes are thin; services do work.
- `src/db/` — Prisma client singleton + helpers.
- `src/middleware/auth.ts` — bearer-token check. Applied globally to `/api/*`.
- `prisma/schema.prisma` — DB schema. Mirrors `packages/shared` envelope types.

## Sync contract invariants
- All sync POSTs send an array of envelopes. Server dedupes by
  `(source, externalId)` unique index — sending the same envelope twice is a no-op.
- Responses return `{ accepted: N, duplicates: M }`.
- Timestamps: always epoch milliseconds (number), UTC. Never strings.
- Validate every POST body with the Zod schema from `@mind-sync/shared`.

## Patterns
- Errors: throw `HttpError` (see `src/middleware/error.ts`). Middleware
  converts to JSON response. Don't `res.status(…).send(…)` in routes.
- Logging: pino. Never `console.log` in production paths.
- Prisma migrations are append-only in committed history. Don't edit old
  migrations; create a new one to fix.

## Gotchas
- Single-user: don't add user tables, multi-tenancy, or role checks.
  The bearer token IS the auth model.
- Prisma + pnpm: if `@prisma/client` import fails after schema change, run
  `pnpm prisma generate` (not `pnpm install`).
