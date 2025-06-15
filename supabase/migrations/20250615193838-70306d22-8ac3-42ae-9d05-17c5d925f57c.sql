
-- Create the property_listings table first
CREATE TABLE public.property_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2),
  currency TEXT DEFAULT '₪',
  property_type TEXT NOT NULL CHECK (property_type IN ('apartment', 'house', 'villa', 'penthouse', 'studio', 'commercial', 'land')),
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent')),
  address TEXT NOT NULL,
  neighborhood TEXT,
  city TEXT NOT NULL,
  bedrooms INTEGER CHECK (bedrooms >= 0),
  bathrooms INTEGER CHECK (bathrooms >= 0),
  living_rooms INTEGER CHECK (living_rooms >= 0),
  area DECIMAL(8,2) CHECK (area > 0),
  floor_number INTEGER,
  total_floors INTEGER,
  year_built INTEGER CHECK (year_built > 1800),
  parking_spots INTEGER DEFAULT 0,
  balcony BOOLEAN DEFAULT false,
  elevator BOOLEAN DEFAULT false,
  garden BOOLEAN DEFAULT false,
  air_conditioning BOOLEAN DEFAULT false,
  heating BOOLEAN DEFAULT false,
  furnished BOOLEAN DEFAULT false,
  pets_allowed BOOLEAN DEFAULT false,
  contact_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT,
  images TEXT[], -- Array of image URLs
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'published')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.property_listings ENABLE ROW LEVEL SECURITY;

-- Create policies for property listings
CREATE POLICY "Users can view their own listings" 
  ON public.property_listings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own listings" 
  ON public.property_listings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own listings" 
  ON public.property_listings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy for public to view approved/published listings
CREATE POLICY "Public can view published listings" 
  ON public.property_listings 
  FOR SELECT 
  USING (status IN ('approved', 'published'));

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_property_listings_updated_at 
    BEFORE UPDATE ON public.property_listings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_property_listings_user_id ON public.property_listings(user_id);
CREATE INDEX idx_property_listings_status ON public.property_listings(status);
CREATE INDEX idx_property_listings_listing_type ON public.property_listings(listing_type);
CREATE INDEX idx_property_listings_property_type ON public.property_listings(property_type);
CREATE INDEX idx_property_listings_city ON public.property_listings(city);
CREATE INDEX idx_property_listings_created_at ON public.property_listings(created_at);
