
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ScrapedProperty, PropertyListing } from '@/types/database';

export type PropertyDetailsType = ScrapedProperty | PropertyListing;

export const usePropertyDetails = (id: string) => {
  return useQuery({
    queryKey: ['property_details', id],
    queryFn: async (): Promise<PropertyDetailsType> => {
      console.log('Fetching property with ID:', id);
      
      // First try to fetch from scraped_properties
      const { data: scrapedData, error: scrapedError } = await supabase
        .from('scraped_properties')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!scrapedError && scrapedData) {
        console.log('Found property in scraped_properties');
        return scrapedData;
      }

      // If not found in scraped_properties, try property_listings
      const { data: listingData, error: listingError } = await supabase
        .from('property_listings')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (listingError) {
        console.error('Error fetching from property_listings:', listingError);
        throw listingError;
      }

      if (!listingData) {
        throw new Error('Property not found in either table');
      }

      console.log('Found property in property_listings');
      return listingData;
    },
  });
};
