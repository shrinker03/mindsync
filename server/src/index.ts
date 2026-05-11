import { app } from './app.js';
import { config } from './config.js';
import { log } from './log.js';

app.listen(config.port, () => {
  log.info({ port: config.port }, 'mind-sync server listening');
});
