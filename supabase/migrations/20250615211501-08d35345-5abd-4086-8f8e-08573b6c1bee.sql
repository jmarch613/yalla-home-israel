
-- Add missing fields to property_listings table if they don't exist
ALTER TABLE public.property_listings 
ADD COLUMN IF NOT EXISTS safe_room BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS bomb_shelter BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS floorplan_url TEXT;

-- Update the property submission to ensure all required indexes exist
CREATE INDEX IF NOT EXISTS idx_property_listings_neighborhood ON public.property_listings(neighborhood);
CREATE INDEX IF NOT EXISTS idx_property_listings_price ON public.property_listings(price);
CREATE INDEX IF NOT EXISTS idx_property_listings_bedrooms ON public.property_listings(bedrooms);
CREATE INDEX IF NOT EXISTS idx_property_listings_bathrooms ON public.property_listings(bathrooms);
CREATE INDEX IF NOT EXISTS idx_property_listings_area ON public.property_listings(area);
