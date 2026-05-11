import pino, { type Logger } from 'pino';
import fs from 'fs';
import path from 'path';
import { config } from './config.js';

function makeLogger(): Logger {
  if (process.env.VERCEL === '1') {
    return pino({ level: config.logLevel });
  }

  const logsDir = path.resolve('logs');
  fs.mkdirSync(logsDir, { recursive: true });

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

  return pino({ level: config.logLevel }, transport);
}

export const log = makeLogger();
