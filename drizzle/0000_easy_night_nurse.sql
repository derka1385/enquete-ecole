CREATE TABLE `responses` (
	`id` text PRIMARY KEY NOT NULL,
	`study_id` text NOT NULL,
	`profile` text NOT NULL,
	`paper_ref` text NOT NULL,
	`status` text NOT NULL,
	`answers` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`study_id`) REFERENCES `studies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `response_paper_unique` ON `responses` (`study_id`,`profile`,`paper_ref`);--> statement-breakpoint
CREATE TABLE `studies` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`key_hash` text NOT NULL,
	`created_at` text NOT NULL
);
