declare global {
  interface BigInt {
    toJSON(): string;
  }
}
BigInt.prototype.toJSON = function () {
  return this.toString();
};

import express from 'express';
import { pinoHttp } from 'pino-http';
import { config } from './config.js';
import { log } from './log.js';
import { healthRouter } from './routes/health.js';
import { syncRouter } from './routes/sync.js';
import { dataRouter } from './routes/data.js';
import { requireBearer } from './middleware/auth.js';
import { errorHandler } from './middleware/error.js';

const app = express();

app.use(pinoHttp({ logger: log }));
app.use(express.json({ limit: '5mb' }));

app.use('/api', requireBearer);
app.use('/api/health', healthRouter);
app.use('/api/sync', syncRouter);
app.use('/api/data', dataRouter);

app.use(express.static('public'));

app.use(errorHandler);

app.listen(config.port, () => {
  log.info({ port: config.port }, 'mind-sync server listening');
});
