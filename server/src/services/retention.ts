import { prisma } from '../db/prisma.js';
import { config } from '../config.js';
import { log } from '../log.js';

const DAY_MS = 24 * 60 * 60 * 1000;
const INTERVAL_MS = 12 * 60 * 60 * 1000;

export type PruneCounts = { sms: number; calls: number; notifications: number };

/**
 * Deletes sms, call, and notification records older than RETENTION_DAYS, by their
 * own event time (sms/call `date`, notification `timestamp`, all epoch ms).
 * Returns per-table counts. Pruning is skipped when retention is <= 0.
 */
export async function pruneOldRecords(): Promise<PruneCounts> {
  const days = config.retentionDays;
  if (!Number.isFinite(days) || days <= 0) return { sms: 0, calls: 0, notifications: 0 };

  const cutoff = BigInt(Date.now() - days * DAY_MS);
  const [sms, calls, notifications] = await Promise.all([
    prisma.smsMessage.deleteMany({ where: { date: { lt: cutoff } } }),
    prisma.callEntry.deleteMany({ where: { date: { lt: cutoff } } }),
    prisma.notification.deleteMany({ where: { timestamp: { lt: cutoff } } }),
  ]);

  const counts: PruneCounts = { sms: sms.count, calls: calls.count, notifications: notifications.count };
  if (counts.sms + counts.calls + counts.notifications > 0) {
    log.info({ ...counts, retentionDays: days }, 'pruned old records');
  }
  return counts;
}

/**
 * Runs the prune once now (covers Render free-tier cold starts) and then every 12h
 * while the process stays alive. No external scheduler needed.
 */
export function startRetentionJob(): void {
  const run = (): void => {
    void pruneOldRecords().catch(e => log.error(e, 'retention prune failed'));
  };
  run();
  const timer = setInterval(run, INTERVAL_MS);
  timer.unref?.();
}
