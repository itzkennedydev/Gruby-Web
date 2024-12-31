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