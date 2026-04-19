# shared — sync protocol types + schemas

Zod schemas for the sync envelope, TS types derived from them.
Imported as `@mind-sync/shared` by both `app` and `server`.

## Rule
**This is the single source of truth for the sync wire format.**
If app and server disagree about a field shape, change it HERE first
and let types propagate.

## Structure
- `src/schemas/` — one Zod schema per envelope type (`sms`, `call`, `notification`)
- `src/types/` — TS types inferred from schemas via `z.infer<typeof …>`
- `src/index.ts` — barrel re-export

## Run
- `pnpm typecheck`

No build step — consumers import `.ts` directly (Metro and tsx both handle TS).
See root `tsconfig.base.json` for strict settings.
