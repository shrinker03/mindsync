import { eq } from 'drizzle-orm';

import { CallLogReaderModule } from '../native/CallLogReader';
import { db } from '../db';
import { callEntries, syncCursors } from '../db/schema';

const SOURCE = 'call';

async function getCursor(): Promise<string> {
  const row = await db
    .select()
    .from(syncCursors)
    .where(eq(syncCursors.source, SOURCE))
    .get();
  return row?.lastId ?? '';
}

async function saveCursor(lastId: string): Promise<void> {
  await db.insert(syncCursors)
    .values({ source: SOURCE, lastId, updatedAt: Date.now() })
    .onConflictDoUpdate({
      target: syncCursors.source,
      set: { lastId, updatedAt: Date.now() },
    })
    .run();
}

export async function syncCalls(limit = 200): Promise<number> {
  const afterId = await getCursor();
  const envelopes = await CallLogReaderModule.read(afterId, limit);
  if (envelopes.length === 0) return 0;

  const now = Date.now();
  const rows = envelopes.map(env => ({
    externalId: env.id,
    number: env.number,
    duration: env.duration,
    date: env.date,
    type: env.type,
    name: env.name ?? null,
    synced: 0,
    createdAt: now,
  }));

  const returned = await db.insert(callEntries)
    .values(rows)
    .onConflictDoNothing()
    .returning({ id: callEntries.id });

  const lastEnvelope = envelopes[envelopes.length - 1];
  if (lastEnvelope) await saveCursor(lastEnvelope.id);

  return returned.length;
}
