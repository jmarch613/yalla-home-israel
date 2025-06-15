
import React from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { useScrapedProperties, useTriggerScraping } from '@/hooks/useScrapedProperties';
import { useToast } from '@/hooks/use-toast';
import { PropertyGridHeader } from './PropertyGridHeader';
import { PropertyGridEmptyState } from './PropertyGridEmptyState';
import { transformProperties, filterProperties, sortProperties } from '@/utils/propertyFiltering';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface PropertyGridProps {
  filters: any;
  sort: string;
  onSortChange: (sort: string) => void;
}

// Helper to transform user properties to PropertyCardType
function transformUserPropertyToCardType(property: any) {
  return {
    id: property.id,
    title: property.title || 'Property Title',
    location: property.address || property.city || 'Jerusalem',
    price: property.price ? `₪${property.price}` : '₪0',
    type: property.listing_type ?? 'sale',
    bedrooms: property.bedrooms ?? 0,
    bathrooms: property.bathrooms ?? 0,
    area: property.area ?? 0,
    image: Array.isArray(property.images) && property.images.length > 0
      ? property.images[0]
      : '/placeholder.svg',
    features: [
      property.property_type || 'Property',
      property.neighborhood || property.city || 'Jerusalem',
      // Marketing features for display — only show if true:
      ...(property.balcony ? ['Balcony'] : []),
      ...(property.elevator ? ['Elevator'] : []),
      ...(property.garden ? ['Garden'] : []),
      ...(property.air_conditioning ? ['Air Conditioning'] : []),
      ...(property.heating ? ['Heating'] : []),
      ...(property.furnished ? ['Furnished'] : []),
      ...(property.pets_allowed ? ['Pets Allowed'] : []),
      ...(property.safe_room ? ['Safe Room'] : []),
      ...(property.bomb_shelter ? ['Bomb Shelter'] : []),
      // Always show if recently created/approved
      property.created_at ? 'User Listing' : '',
    ].filter(Boolean),
    created_at: property.created_at,
  };
}

export const PropertyGrid = ({ filters, sort = 'most-recent', onSortChange }: PropertyGridProps) => {
  // Fetch scraped properties as before
  const { data: scrapedProperties, isLoading: loadingScraped, error: errorScraped, refetch } = useScrapedProperties();
  // Fetch approved or published user-listed properties
  const { data: userListedData, isLoading: loadingUser, error: errorUser } = useQuery({
    queryKey: ['property_listings'],
    queryFn: async () => {
      // Only show approved or published listings to all users
      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .in('status', ['approved', 'published']);
      if (error) throw error;
      return data ?? [];
    },
  });

  const { toast } = useToast();
  const { triggerScraping } = useTriggerScraping();

  const handleScrapeData = async () => {
    try {
      toast({
        title: "Starting scraping...",
        description: "Fetching latest property data from remaxjerusalem.com",
      });

      await triggerScraping();
      await refetch();

      toast({
        title: "Scraping completed!",
        description: "Property data has been updated successfully.",
      });
    } catch (error) {
      console.error('Scraping failed:', error);
      toast({
        title: "Scraping failed",
        description: "Failed to fetch property data. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Prepare data
  const allScraped = transformProperties(scrapedProperties);
  const allUserListed = Array.isArray(userListedData)
    ? userListedData.map(transformUserPropertyToCardType)
    : [];
  // Merge all properties from both sources
  const allProperties = [
    ...allUserListed,
    ...allScraped
  ];

  let filteredProperties = filterProperties(allProperties, filters);
  filteredProperties = sortProperties(filteredProperties, sort);

  // Loading and error states
  const isLoading = loadingScraped || loadingUser;
  const error = errorScraped || errorUser;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <span className="animate-spin mx-auto mb-4 text-gray-500">
            {/* Loading spinner icon */}
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12A8 8 0 0 1 20 12"></path>
            </svg>
          </span>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load properties</p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium border-gray-300 hover:bg-gray-100"
        >
          <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12A8 8 0 0 1 20 12"></path>
          </svg>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <PropertyGridHeader
        filteredCount={filteredProperties.length}
        totalCount={allProperties.length}
        onUpdateData={handleScrapeData}
        sort={sort}
        onSortChange={onSortChange}
      />
      {filteredProperties.length === 0 ? (
        <PropertyGridEmptyState
          hasAnyProperties={allProperties.length > 0}
          onScrape={handleScrapeData}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};
