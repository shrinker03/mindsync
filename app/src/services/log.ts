import { asc, count, eq, inArray } from 'drizzle-orm';
import { db } from '../db';
import { appLogs } from '../db/schema';

const MAX_LOGS = 500;

export type LogLevel = 'info' | 'warn' | 'error';

export async function appLog(
  level: LogLevel,
  tag: string,
  message: string,
  data?: unknown,
): Promise<void> {
  try {
    await db.insert(appLogs).values({
      level,
      tag,
      message,
      data: data != null ? JSON.stringify(data) : null,
      timestamp: Date.now(),
    }).run();

    const c = await db.select({ n: count() }).from(appLogs).get();
    if (c && c.n > MAX_LOGS) {
      const oldest = await db
        .select({ id: appLogs.id })
        .from(appLogs)
        .orderBy(asc(appLogs.timestamp))
        .limit(c.n - MAX_LOGS)
        .all();
      if (oldest.length > 0) {
        await db.delete(appLogs).where(inArray(appLogs.id, oldest.map(r => r.id))).run();
      }
    }
  } catch {
    // Logging must never crash the app
  }
}
