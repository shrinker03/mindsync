import express from 'express';
import { pinoHttp } from 'pino-http';
import { config } from './config.js';
import { log } from './log.js';
import { healthRouter } from './routes/health.js';

const app = express();

app.use(pinoHttp({ logger: log }));
app.use(express.json({ limit: '5mb' }));

app.use('/api/health', healthRouter);

app.listen(config.port, () => {
  log.info({ port: config.port }, 'mind-sync server listening');
});
