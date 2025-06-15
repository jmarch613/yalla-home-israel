
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ScrapedProperty } from '@/types/database';

export const useScrapedProperties = () => {
  return useQuery({
    queryKey: ['scraped-properties'],
    queryFn: async (): Promise<ScrapedProperty[]> => {
      console.log('Fetching scraped properties...');
      
      const { data, error } = await supabase
        .from('scraped_properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching scraped properties:', error);
        throw new Error(`Failed to fetch properties: ${error.message}`);
      }

      console.log('Fetched properties:', data?.length || 0);
      return data as ScrapedProperty[] || [];
    },
  });
};

export const useTriggerScraping = () => {
  const triggerScraping = async (url?: string) => {
    console.log('Triggering scraping for URL:', url || 'default');
    
    try {
      const { data, error } = await supabase.functions.invoke('scrape-properties', {
        body: { url: url || 'https://remaxjerusalem.com/en' }
      });

      if (error) {
        console.error('Scraping error:', error);
        throw error;
      }

      console.log('Scraping result:', data);
      return data;
    } catch (error) {
      console.error('Failed to trigger scraping:', error);
      throw error;
    }
  };

  return { triggerScraping };
};
