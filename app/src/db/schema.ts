import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const smsMessages = sqliteTable(
  'sms_messages',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    externalId: text('external_id').notNull(),
    address: text('address').notNull(),
    body: text('body').notNull(),
    date: integer('date').notNull(),
    type: integer('type').notNull(),
    threadId: text('thread_id').notNull(),
    read: integer('read').notNull(),
    synced: integer('synced').notNull().default(0),
    createdAt: integer('created_at').notNull(),
  },
  t => ({ uniqIdx: uniqueIndex('sms_external_id_unique').on(t.externalId) }),
);

export const callEntries = sqliteTable(
  'call_entries',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    externalId: text('external_id').notNull(),
    number: text('number').notNull(),
    duration: integer('duration').notNull(),
    date: integer('date').notNull(),
    type: integer('type').notNull(),
    name: text('name'),
    synced: integer('synced').notNull().default(0),
    createdAt: integer('created_at').notNull(),
  },
  t => ({ uniqIdx: uniqueIndex('call_external_id_unique').on(t.externalId) }),
);

export const notifications = sqliteTable(
  'notifications',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    externalId: text('external_id').notNull(),
    pkg: text('pkg').notNull(),
    title: text('title'),
    text: text('text'),
    timestamp: integer('timestamp').notNull(),
    synced: integer('synced').notNull().default(0),
    createdAt: integer('created_at').notNull(),
  },
  t => ({
    uniqIdx: uniqueIndex('notification_external_id_unique').on(t.externalId),
  }),
);

export const syncCursors = sqliteTable('sync_cursors', {
  source: text('source').primaryKey(),
  lastId: text('last_id').notNull().default(''),
  updatedAt: integer('updated_at').notNull(),
});
