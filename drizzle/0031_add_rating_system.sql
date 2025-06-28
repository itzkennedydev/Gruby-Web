-- Add rating fields to home_cooks table
ALTER TABLE "home_cooks" ADD COLUMN IF NOT EXISTS "average_rating" decimal(3,2) DEFAULT 0.00;
ALTER TABLE "home_cooks" ADD COLUMN IF NOT EXISTS "total_reviews" integer DEFAULT 0;

-- Create reviews table
CREATE TABLE IF NOT EXISTS "reviews" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "home_cook_id" uuid NOT NULL REFERENCES "home_cooks"("id") ON DELETE CASCADE,
    "user_id" text NOT NULL REFERENCES "users"("user_id") ON DELETE CASCADE,
    "order_id" integer REFERENCES "orders"("id") ON DELETE SET NULL,
    "rating" integer NOT NULL CHECK ("rating" >= 1 AND "rating" <= 5),
    "comment" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "reviews_home_cook_id_idx" ON "reviews" ("home_cook_id");
CREATE INDEX IF NOT EXISTS "reviews_user_id_idx" ON "reviews" ("user_id");
CREATE INDEX IF NOT EXISTS "reviews_order_id_idx" ON "reviews" ("order_id");
CREATE INDEX IF NOT EXISTS "reviews_rating_idx" ON "reviews" ("rating");

-- Create unique constraint to prevent multiple reviews from same user for same home cook
CREATE UNIQUE INDEX IF NOT EXISTS "unique_user_home_cook_review" ON "reviews" ("user_id", "home_cook_id");

-- Add comments for documentation
COMMENT ON COLUMN "home_cooks"."average_rating" IS 'Average rating from all reviews (1-5 scale)';
COMMENT ON COLUMN "home_cooks"."total_reviews" IS 'Total number of reviews received';
COMMENT ON TABLE "reviews" IS 'User reviews and ratings for home cooks';
COMMENT ON COLUMN "reviews"."rating" IS 'Rating from 1-5 stars'; 