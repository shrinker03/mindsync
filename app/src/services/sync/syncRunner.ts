import { eq, inArray } from 'drizzle-orm';

import { db } from '../../db';
import { callEntries, notifications, smsMessages } from '../../db/schema';
import { postBatch } from './syncClient';
import { SYNC_BATCH_SIZE } from './syncConfig';

const SOURCE = 'mindsync-android';

async function drainSms(): Promise<void> {
  while (true) {
    const rows = await db
      .select()
      .from(smsMessages)
      .where(eq(smsMessages.synced, 0))
      .limit(SYNC_BATCH_SIZE)
      .all();
    if (rows.length === 0) break;

    const items = rows.map(r => ({
      id: r.externalId,
      address: r.address,
      body: r.body,
      date: r.date,
      type: r.type,
      threadId: r.threadId,
      read: r.read,
    }));

    await postBatch('sms', SOURCE, items);

    const ids = rows.map(r => r.id);
    await db
      .update(smsMessages)
      .set({ synced: 1 })
      .where(inArray(smsMessages.id, ids))
      .run();
  }
}

async function drainCalls(): Promise<void> {
  while (true) {
    const rows = await db
      .select()
      .from(callEntries)
      .where(eq(callEntries.synced, 0))
      .limit(SYNC_BATCH_SIZE)
      .all();
    if (rows.length === 0) break;

    const items = rows.map(r => ({
      id: r.externalId,
      number: r.number,
      duration: r.duration,
      date: r.date,
      type: r.type,
      name: r.name ?? null,
    }));

    await postBatch('call', SOURCE, items);

    const ids = rows.map(r => r.id);
    await db
      .update(callEntries)
      .set({ synced: 1 })
      .where(inArray(callEntries.id, ids))
      .run();
  }
}

async function drainNotifications(): Promise<void> {
  while (true) {
    const rows = await db
      .select()
      .from(notifications)
      .where(eq(notifications.synced, 0))
      .limit(SYNC_BATCH_SIZE)
      .all();
    if (rows.length === 0) break;

    const items = rows.map(r => ({
      id: r.externalId,
      pkg: r.pkg,
      title: r.title ?? null,
      text: r.text ?? null,
      timestamp: r.timestamp,
    }));

    await postBatch('notification', SOURCE, items);

    const ids = rows.map(r => r.id);
    await db
      .update(notifications)
      .set({ synced: 1 })
      .where(inArray(notifications.id, ids))
      .run();
  }
}

export async function runSync(): Promise<void> {
  await drainSms();
  await drainCalls();
  await drainNotifications();
}
