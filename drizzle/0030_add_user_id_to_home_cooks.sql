-- Add userId column to home_cooks table to link to Clerk users
-- This allows us to tie home cook profiles to authenticated users

-- Add the userId column
ALTER TABLE "home_cooks" ADD COLUMN IF NOT EXISTS "user_id" text NOT NULL DEFAULT '';

-- Create unique index to prevent duplicate home cooks per user
CREATE UNIQUE INDEX IF NOT EXISTS "unique_user_home_cook" ON "home_cooks" ("user_id");

-- Add comment to document the change
COMMENT ON COLUMN "home_cooks"."user_id" IS 'Links home cook profile to Clerk user ID'; 