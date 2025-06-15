
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
          images,
          floorplan_url,
          created_at,
          updated_at
        `)
        .in("status", ["approved", "published"]);
      if (error) throw error;
      
      // Transform the data to match PropertyListing interface
      return (data ?? []).map(item => ({
        ...item,
        safe_room: false, // Default value since this field doesn't exist in current schema
        bomb_shelter: false, // Default value since this field doesn't exist in current schema
      })) as PropertyListing[];
    },
  });

  const allScraped = transformProperties(scraped.data);
  const allUserListed =
    Array.isArray(userListedData) && userListedData.length > 0
      ? userListedData.map(transformUserPropertyToCardType)
      : [];

  const allProperties: PropertyCardType[] = [...allUserListed, ...allScraped];

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
