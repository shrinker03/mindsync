import { open } from '@op-engineering/op-sqlite';
import { drizzle } from 'drizzle-orm/op-sqlite';
import { migrate } from 'drizzle-orm/op-sqlite/migrator';

import { migrations } from './migrations';
import * as schema from './schema';

const raw = open({ name: 'mindsync.db' });

export const db = drizzle(raw, { schema });

export async function initDb(): Promise<void> {
  await migrate(db, migrations);
}
