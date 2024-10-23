ALTER TABLE "users" DROP CONSTRAINT "users_user_id_unique";--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "id";