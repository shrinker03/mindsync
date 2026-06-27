import { app } from './app.js';
import { config } from './config.js';
import { log } from './log.js';
import { startRetentionJob } from './services/retention.js';

app.listen(config.port, () => {
  log.info({ port: config.port }, 'mind-sync server listening');
  startRetentionJob();
});
