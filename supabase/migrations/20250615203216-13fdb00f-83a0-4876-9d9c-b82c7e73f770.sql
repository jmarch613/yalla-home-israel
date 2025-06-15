
-- Create scraping_sessions table that the edge function expects
CREATE TABLE public.scraping_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed', 'failed')),
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  properties_found INTEGER DEFAULT 0,
  completed_pages INTEGER DEFAULT 0,
  total_pages INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.scraping_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to scraping sessions
CREATE POLICY "Public can view scraping sessions" 
  ON public.scraping_sessions 
  FOR SELECT 
  TO public
  USING (true);

-- Create policy to allow service role to insert/update scraping sessions
CREATE POLICY "Service role can manage scraping sessions" 
  ON public.scraping_sessions 
  FOR ALL 
  TO service_role
  USING (true);

-- Create index for better performance
CREATE INDEX idx_scraping_sessions_status ON public.scraping_sessions(status);
CREATE INDEX idx_scraping_sessions_created_at ON public.scraping_sessions(created_at);
