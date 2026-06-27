import { prisma } from '../db/prisma.js';
import { config } from '../config.js';
import { log } from '../log.js';

const DAY_MS = 24 * 60 * 60 * 1000;
const INTERVAL_MS = 12 * 60 * 60 * 1000;

/**
 * Deletes notifications whose post time is older than NOTIFICATION_RETENTION_DAYS.
 * SMS and call logs are intentionally left alone — they're durable records, not noise.
 * Returns the number of rows deleted. Pruning is skipped when retention is <= 0.
 */
export async function pruneOldNotifications(): Promise<number> {
  const days = config.notificationRetentionDays;
  if (!Number.isFinite(days) || days <= 0) return 0;

  const cutoff = BigInt(Date.now() - days * DAY_MS);
  const result = await prisma.notification.deleteMany({ where: { timestamp: { lt: cutoff } } });
  if (result.count > 0) log.info({ deleted: result.count, retentionDays: days }, 'pruned old notifications');
  return result.count;
}

/**
 * Runs the prune once now (covers Render free-tier cold starts) and then every 12h
 * while the process stays alive. No external scheduler needed.
 */
export function startRetentionJob(): void {
  const run = (): void => {
    void pruneOldNotifications().catch(e => log.error(e, 'notification retention prune failed'));
  };
  run();
  const timer = setInterval(run, INTERVAL_MS);
  timer.unref?.();
}
