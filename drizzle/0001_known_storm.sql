ALTER TABLE "home_cooks" ADD COLUMN "stripe_account_id" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "stripe_account_status" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "onboarding_completed" text DEFAULT 'false' NOT NULL;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "business_name" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "business_type" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "tax_id" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "date_of_birth" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "ssn_last_4" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "state" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "postal_code" text;--> statement-breakpoint
ALTER TABLE "home_cooks" ADD COLUMN "country" text;