ALTER TABLE "users" DROP CONSTRAINT "users_user_id_unique";--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "chefs" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "chefs" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "order_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "order_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "product_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "product_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "chef_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "chef_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "chefs" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "chefs" ADD COLUMN "banner_url" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chefs" ADD CONSTRAINT "chefs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "chefs" DROP COLUMN IF EXISTS "cover_image_url";--> statement-breakpoint
ALTER TABLE "chefs" DROP COLUMN IF EXISTS "specialty";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "chefs" ADD CONSTRAINT "chefs_user_id_unique" UNIQUE("user_id");