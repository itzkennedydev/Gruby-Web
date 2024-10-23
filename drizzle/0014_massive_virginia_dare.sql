ALTER TABLE "orders" ALTER COLUMN "user_id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_id" text DEFAULT requesting_user_id();