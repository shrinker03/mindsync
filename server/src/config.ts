import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value || value.length === 0) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const config = {
  databaseUrl: required('DATABASE_URL'),
  syncBearerToken: required('SYNC_BEARER_TOKEN'),
  port: Number(process.env.PORT ?? 3000),
  logLevel: process.env.LOG_LEVEL ?? 'info',
  // Notifications older than this are auto-pruned. 0 (or negative) disables pruning.
  notificationRetentionDays: Number(process.env.NOTIFICATION_RETENTION_DAYS ?? 14),
} as const;
