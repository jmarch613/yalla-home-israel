
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
          created_at,
          updated_at
        `)
        .in("status", ["approved", "published"]);
      if (error) throw error;
      
      // Transform the data to match PropertyListing interface
      return (data ?? []).map(item => {
        if (!item) return null;
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
          safe_room: false, // Default value since this field doesn't exist in current schema
          bomb_shelter: false, // Default value since this field doesn't exist in current schema
          images: item.images,
          floorplan_url: null, // Default value since this field doesn't exist in current schema
          created_at: item.created_at,
          updated_at: item.updated_at,
        } as PropertyListing;
      }).filter(Boolean) as PropertyListing[];
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
