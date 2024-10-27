ALTER TABLE "chefs" DROP CONSTRAINT "chefs_user_id_unique";--> statement-breakpoint
ALTER TABLE "chefs" DROP COLUMN IF EXISTS "user_id";