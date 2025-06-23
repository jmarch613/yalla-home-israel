
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ScrapedProperty, PropertyListing } from '@/types/database';
import { sampleProperties } from '@/data/sampleProperties';
import { PropertyCardType } from '@/utils/propertyFiltering';

export type PropertyDetailsType = ScrapedProperty | PropertyListing | PropertyCardType;

export const usePropertyDetails = (id: string) => {
  return useQuery({
    queryKey: ['property_details', id],
    queryFn: async (): Promise<PropertyDetailsType> => {
      console.log('Fetching property with ID:', id);
      
      // Check if this is a sample property
      if (id.startsWith('sample-')) {
        console.log('Looking for sample property with ID:', id);
        const sampleProperty = sampleProperties.find(prop => prop.id === id);
        
        if (sampleProperty) {
          console.log('Found sample property:', sampleProperty.title);
          return sampleProperty as PropertyCardType;
        } else {
          console.log('Sample property not found');
          throw new Error('Sample property not found');
        }
      }
      
      // First try to fetch from scraped_properties
      const { data: scrapedData, error: scrapedError } = await supabase
        .from('scraped_properties')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!scrapedError && scrapedData) {
        console.log('Found property in scraped_properties');
        return scrapedData as ScrapedProperty;
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
      // Explicitly cast to PropertyListing type to satisfy TypeScript
      return listingData as PropertyListing;
    },
  });
};
