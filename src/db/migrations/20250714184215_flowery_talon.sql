-- Add linkedin_url column as nullable first
ALTER TABLE "boilerlaunch_products" ADD COLUMN "linkedin_url" text;

-- Update existing records with a default value
UPDATE "boilerlaunch_products" SET "linkedin_url" = 'https://linkedin.com/in/default' WHERE "linkedin_url" IS NULL;

-- Make the column not null
ALTER TABLE "boilerlaunch_products" ALTER COLUMN "linkedin_url" SET NOT NULL;