
-- Add new status options to the property_listings table
ALTER TABLE public.property_listings 
DROP CONSTRAINT IF EXISTS property_listings_status_check;

ALTER TABLE public.property_listings 
ADD CONSTRAINT property_listings_status_check 
CHECK (status IN ('pending', 'approved', 'rejected', 'published', 'under_offer', 'sold', 'withdrawn', 'price_reduced'));

-- Update the default status to remain 'approved' for new listings
ALTER TABLE public.property_listings 
ALTER COLUMN status SET DEFAULT 'approved';
