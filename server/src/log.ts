import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { config } from './config.js';

const logsDir = path.resolve('logs');
fs.mkdirSync(logsDir, { recursive: true });

// Prune log files older than 7 days
const cutoffMs = Date.now() - 7 * 24 * 60 * 60 * 1000;
try {
  for (const f of fs.readdirSync(logsDir)) {
    const fp = path.join(logsDir, f);
    if (fs.statSync(fp).mtimeMs < cutoffMs) fs.unlinkSync(fp);
  }
} catch {}

const logFile = path.join(logsDir, `server-${new Date().toISOString().slice(0, 10)}.log`);

const transport = pino.transport({
  targets: [
    { target: 'pino/file', level: config.logLevel, options: { destination: 1 } },
    { target: 'pino/file', level: config.logLevel, options: { destination: logFile } },
  ],
});

export const log = pino({ level: config.logLevel }, transport);
