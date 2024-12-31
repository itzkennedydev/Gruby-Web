-- First, drop the existing foreign key if it exists
ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_chef_id_fkey";

-- Add a new UUID column
ALTER TABLE "products" ADD COLUMN "chef_id_new" uuid;

-- Drop the old column and rename the new one
ALTER TABLE "products" DROP COLUMN "chef_id";
ALTER TABLE "products" RENAME COLUMN "chef_id_new" TO "chef_id";

-- Make it not null
ALTER TABLE "products" ALTER COLUMN "chef_id" SET NOT NULL;

-- Add the foreign key constraint
ALTER TABLE "products" 
    ADD CONSTRAINT "products_chef_id_fkey" 
    FOREIGN KEY ("chef_id") 
    REFERENCES "chefs"("id"); 