ALTER TABLE "home_cooks" ADD COLUMN "subscription_status" text DEFAULT 'inactive' NOT NULL;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "subscription_id" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "subscription_end_date" timestamp;