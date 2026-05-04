CREATE TABLE `app_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`level` text NOT NULL,
	`tag` text NOT NULL,
	`message` text NOT NULL,
	`data` text,
	`timestamp` integer NOT NULL
);
