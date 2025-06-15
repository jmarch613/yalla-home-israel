
-- Create scraped_properties table
CREATE TABLE public.scraped_properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  price TEXT,
  address TEXT,
  description TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DECIMAL(8,2),
  property_type TEXT,
  neighborhood TEXT,
  image_url TEXT,
  listing_url TEXT,
  source_website TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance on scraped_properties
CREATE INDEX idx_scraped_properties_created_at ON public.scraped_properties(created_at);
CREATE INDEX idx_scraped_properties_property_type ON public.scraped_properties(property_type);
CREATE INDEX idx_scraped_properties_neighborhood ON public.scraped_properties(neighborhood);

-- Enable Row Level Security (make it publicly readable since it's scraped data)
ALTER TABLE public.scraped_properties ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to scraped properties
CREATE POLICY "Public can view scraped properties" 
  ON public.scraped_properties 
  FOR SELECT 
  TO public
  USING (true);

-- Create policy to allow service role to insert scraped properties  
CREATE POLICY "Service role can insert scraped properties" 
  ON public.scraped_properties 
  FOR INSERT 
  TO service_role
  WITH CHECK (true);
