
import { useScrapedProperties, useTriggerScraping } from "@/hooks/useScrapedProperties";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { transformProperties, PropertyCardType } from "@/utils/propertyFiltering";
import { transformUserPropertyToCardType } from "@/utils/transformUserProperty";
import { PropertyListing } from "@/types/database";

/**
 * Unified hook to get all merged & transformed properties with loading/error states and refetch/scrape helpers.
 */
export function useAllProperties() {
  const scraped = useScrapedProperties();
  const {
    data: userListedData,
    isLoading: loadingUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["property_listings"],
    queryFn: async (): Promise<PropertyListing[]> => {
      console.log('Fetching user-listed properties...');
      
      const { data, error } = await supabase
        .from("property_listings")
        .select(`
          id,
          user_id,
          title,
          description,
          price,
          property_type,
          listing_type,
          address,
          neighborhood,
          city,
          bedrooms,
          bathrooms,
          living_rooms,
          area,
          floor_number,
          total_floors,
          year_built,
          parking_spots,
          contact_name,
          contact_phone,
          contact_email,
          balcony,
          elevator,
          garden,
          air_conditioning,
          heating,
          furnished,
          pets_allowed,
          safe_room,
          bomb_shelter,
          images,
          floorplan_url,
          status,
          created_at,
          updated_at
        `);
        // No status filter - show all properties regardless of status
        
      if (error) {
        console.error('Error fetching user properties:', error);
        throw error;
      }
      
      console.log('Raw user listed data from DB:', data?.length || 0, 'properties');
      console.log('Raw user data details:', data);
      
      // Transform the data to match PropertyListing interface
      const transformedData = (data ?? []).map(item => {
        if (!item) {
          console.log('Skipping null item');
          return null;
        }
        
        console.log('Processing property:', item.title, 'Status:', item.status, 'City:', item.city);
        
        return {
          id: item.id,
          user_id: item.user_id,
          title: item.title,
          description: item.description,
          price: item.price,
          property_type: item.property_type,
          listing_type: item.listing_type,
          address: item.address,
          neighborhood: item.neighborhood,
          city: item.city,
          bedrooms: item.bedrooms,
          bathrooms: item.bathrooms,
          living_rooms: item.living_rooms,
          area: item.area,
          floor_number: item.floor_number,
          total_floors: item.total_floors,
          year_built: item.year_built,
          parking_spots: item.parking_spots,
          contact_name: item.contact_name,
          contact_phone: item.contact_phone,
          contact_email: item.contact_email,
          balcony: item.balcony,
          elevator: item.elevator,
          garden: item.garden,
          air_conditioning: item.air_conditioning,
          heating: item.heating,
          furnished: item.furnished,
          pets_allowed: item.pets_allowed,
          safe_room: item.safe_room || false,
          bomb_shelter: item.bomb_shelter || false,
          images: item.images,
          floorplan_url: item.floorplan_url,
          status: item.status,
          created_at: item.created_at,
          updated_at: item.updated_at,
        } as PropertyListing;
      }).filter(Boolean) as PropertyListing[];
      
      console.log('Successfully transformed user properties:', transformedData.length);
      return transformedData;
    },
  });

  const allScraped = transformProperties(scraped.data);
  const allUserListed =
    Array.isArray(userListedData) && userListedData.length > 0
      ? userListedData.map(transformUserPropertyToCardType)
      : [];

  console.log('User listed properties after transformation:', allUserListed.length);
  console.log('User listed properties details:', allUserListed);
  console.log('Total scraped properties:', allScraped.length);

  const allProperties: PropertyCardType[] = [...allUserListed, ...allScraped];
  console.log('Combined properties count:', allProperties.length);
  console.log('Final combined properties:', allProperties);

  return {
    allProperties,
    scraped,
    loading: scraped.isLoading || loadingUser,
    error: scraped.error || errorUser,
    refetch: scraped.refetch,
    triggerScraping: useTriggerScraping().triggerScraping,
    rawUserListed: userListedData,
    loadingUser,
    errorUser
  };
}
