// Bundled migrations for React Native (no fs access at runtime).
// To add a migration: run drizzle-kit generate, copy the SQL here as a new const, add an entry to
// journal.entries, and add a key to migrations.

const sql0000 = `CREATE TABLE \`call_entries\` (
\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
\`external_id\` text NOT NULL,
\`number\` text NOT NULL,
\`duration\` integer NOT NULL,
\`date\` integer NOT NULL,
\`type\` integer NOT NULL,
\`name\` text,
\`synced\` integer DEFAULT 0 NOT NULL,
\`created_at\` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX \`call_external_id_unique\` ON \`call_entries\` (\`external_id\`);
--> statement-breakpoint
CREATE TABLE \`notifications\` (
\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
\`external_id\` text NOT NULL,
\`pkg\` text NOT NULL,
\`title\` text,
\`text\` text,
\`timestamp\` integer NOT NULL,
\`synced\` integer DEFAULT 0 NOT NULL,
\`created_at\` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX \`notification_external_id_unique\` ON \`notifications\` (\`external_id\`);
--> statement-breakpoint
CREATE TABLE \`sms_messages\` (
\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
\`external_id\` text NOT NULL,
\`address\` text NOT NULL,
\`body\` text NOT NULL,
\`date\` integer NOT NULL,
\`type\` integer NOT NULL,
\`thread_id\` text NOT NULL,
\`read\` integer NOT NULL,
\`synced\` integer DEFAULT 0 NOT NULL,
\`created_at\` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX \`sms_external_id_unique\` ON \`sms_messages\` (\`external_id\`);
--> statement-breakpoint
CREATE TABLE \`sync_cursors\` (
\`source\` text PRIMARY KEY NOT NULL,
\`last_id\` text DEFAULT '' NOT NULL,
\`updated_at\` integer NOT NULL
);`;

const sql0001 = `CREATE TABLE \`app_logs\` (
\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
\`level\` text NOT NULL,
\`tag\` text NOT NULL,
\`message\` text NOT NULL,
\`data\` text,
\`timestamp\` integer NOT NULL
);`;

export const migrations = {
  journal: {
    version: '7',
    dialect: 'sqlite',
    entries: [
      {
        idx: 0,
        version: '6',
        when: 1777214486045,
        tag: '0000_free_quasar',
        breakpoints: true,
      },
      {
        idx: 1,
        version: '6',
        when: 1746201600000,
        tag: '0001_app_logs',
        breakpoints: true,
      },
    ],
  },
  migrations: {
    m0000: sql0000,
    m0001: sql0001,
  },
};
