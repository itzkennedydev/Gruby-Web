-- Drop tables in correct order
DROP TABLE IF EXISTS "order_items";
DROP TABLE IF EXISTS "orders";
DROP TABLE IF EXISTS "products";
DROP TABLE IF EXISTS "chefs";
DROP TABLE IF EXISTS "users";

-- Recreate tables in correct order
CREATE TABLE IF NOT EXISTS "users" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" text NOT NULL UNIQUE,
    "email" text NOT NULL UNIQUE,
    "name" text,
    "avatar_url" text,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "chefs" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "bio" text,
    "avatar_url" text,
    "cover_image_url" text,
    "specialty" text NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "products" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "description" text,
    "price" decimal(10,2) NOT NULL,
    "image_url" text,
    "chef_id" uuid NOT NULL REFERENCES "chefs"("id"),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "orders" (
    "id" serial PRIMARY KEY,
    "user_id" text NOT NULL,
    "status" text NOT NULL,
    "total" decimal(10,2) NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "order_items" (
    "id" serial PRIMARY KEY,
    "order_id" integer NOT NULL REFERENCES "orders"("id"),
    "product_id" integer NOT NULL REFERENCES "products"("id"),
    "quantity" integer NOT NULL,
    "price" decimal(10,2) NOT NULL
); 