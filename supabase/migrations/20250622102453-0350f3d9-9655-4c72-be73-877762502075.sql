
-- Create a table for banner slides
CREATE TABLE public.banner_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create an index on order_index for better performance when ordering slides
CREATE INDEX idx_banner_slides_order ON public.banner_slides(order_index);

-- Create an index on is_active for filtering active slides
CREATE INDEX idx_banner_slides_active ON public.banner_slides(is_active);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_banner_slides_updated_at
  BEFORE UPDATE ON public.banner_slides
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
