
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
        .select("*")
        .in("status", ["approved", "published"]);
      if (error) throw error;
      return data ?? [];
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
