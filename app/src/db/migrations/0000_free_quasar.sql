CREATE TABLE `call_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`external_id` text NOT NULL,
	`number` text NOT NULL,
	`duration` integer NOT NULL,
	`date` integer NOT NULL,
	`type` integer NOT NULL,
	`name` text,
	`synced` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `call_external_id_unique` ON `call_entries` (`external_id`);--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`external_id` text NOT NULL,
	`pkg` text NOT NULL,
	`title` text,
	`text` text,
	`timestamp` integer NOT NULL,
	`synced` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `notification_external_id_unique` ON `notifications` (`external_id`);--> statement-breakpoint
CREATE TABLE `sms_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`external_id` text NOT NULL,
	`address` text NOT NULL,
	`body` text NOT NULL,
	`date` integer NOT NULL,
	`type` integer NOT NULL,
	`thread_id` text NOT NULL,
	`read` integer NOT NULL,
	`synced` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sms_external_id_unique` ON `sms_messages` (`external_id`);--> statement-breakpoint
CREATE TABLE `sync_cursors` (
	`source` text PRIMARY KEY NOT NULL,
	`last_id` text DEFAULT '' NOT NULL,
	`updated_at` integer NOT NULL
);
