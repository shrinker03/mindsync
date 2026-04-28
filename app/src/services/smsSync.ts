import { eq } from 'drizzle-orm';

import { SmsReaderModule } from '../native/SmsReader';
import { db } from '../db';
import { smsMessages, syncCursors } from '../db/schema';

const SOURCE = 'sms';

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

export async function syncSms(limit = 200): Promise<number> {
  const afterId = await getCursor();
  const envelopes = await SmsReaderModule.read(afterId, limit);
  if (envelopes.length === 0) return 0;

  const now = Date.now();
  const rows = envelopes.map(env => ({
    externalId: env.id,
    address: env.address,
    body: env.body,
    date: env.date,
    type: env.type,
    threadId: env.threadId,
    read: env.read,
    synced: 0,
    createdAt: now,
  }));

  const returned = await db.insert(smsMessages)
    .values(rows)
    .onConflictDoNothing()
    .returning({ id: smsMessages.id });

  const lastEnvelope = envelopes[envelopes.length - 1];
  if (lastEnvelope) await saveCursor(lastEnvelope.id);

  return returned.length;
}
