ALTER TABLE "chefs" DROP CONSTRAINT "chefs_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "chefs" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "quantity" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "price" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "total" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "chefs" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "chefs" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "chefs" ADD CONSTRAINT "chefs_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_id_unique" UNIQUE("user_id");