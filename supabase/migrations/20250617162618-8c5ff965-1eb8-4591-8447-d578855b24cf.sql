
-- Update the default status for new property listings to be 'approved' instead of 'pending'
ALTER TABLE public.property_listings 
ALTER COLUMN status SET DEFAULT 'approved';

-- Create a function to automatically approve new properties
CREATE OR REPLACE FUNCTION public.auto_approve_property()
RETURNS TRIGGER AS $$
BEGIN
  -- Set status to 'approved' for all new properties
  NEW.status = 'approved';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that runs before insert to auto-approve properties
CREATE TRIGGER auto_approve_property_trigger
  BEFORE INSERT ON public.property_listings
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_approve_property();

-- Update any existing pending properties to approved status
UPDATE public.property_listings 
SET status = 'approved' 
WHERE status = 'pending';
