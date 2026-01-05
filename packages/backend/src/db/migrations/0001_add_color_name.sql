-- Rename color column to hex and add name column
ALTER TABLE "product_colors" RENAME COLUMN "color" TO "hex";
ALTER TABLE "product_colors" ADD COLUMN "name" text NOT NULL DEFAULT 'Unknown';
-- Remove default after adding
ALTER TABLE "product_colors" ALTER COLUMN "name" DROP DEFAULT;

