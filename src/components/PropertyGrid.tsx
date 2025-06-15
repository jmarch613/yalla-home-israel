
import React from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { useScrapedProperties, useTriggerScraping } from '@/hooks/useScrapedProperties';
import { Button } from '@/components/ui/button';
import { RefreshCw, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PropertyGridProps {
  filters: any;
}

export const PropertyGrid = ({ filters }: PropertyGridProps) => {
  const { data: scrapedProperties, isLoading, error, refetch } = useScrapedProperties();
  const { triggerScraping } = useTriggerScraping();
  const { toast } = useToast();

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

  // Transform scraped properties to match PropertyCard interface
  const allProperties = scrapedProperties?.map((property) => ({
    id: property.id,
    title: property.title || 'Property Title',
    location: property.address || 'Jerusalem',
    price: property.price || '₪0',
    type: 'sale',
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    area: property.area || 0,
    image: property.image_url || '/placeholder.svg',
    features: [
      property.property_type || 'Property',
      property.neighborhood || 'Jerusalem',
      'Recently Updated'
    ].filter(Boolean)
  })) || [];

  // Apply filters to the properties
  const filteredProperties = allProperties.filter((property) => {
    console.log('Filtering property:', property.title, 'with filters:', filters);
    
    // Location filter
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    // Neighborhood filter
    if (filters.neighborhood && !property.features.some(feature => 
      feature.toLowerCase().includes(filters.neighborhood.toLowerCase())
    )) {
      return false;
    }

    // Property type filter
    if (filters.propertyType && !property.features.some(feature => 
      feature.toLowerCase().includes(filters.propertyType.toLowerCase())
    )) {
      return false;
    }

    // Bedrooms filter
    if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) {
      return false;
    }

    // Bathrooms filter
    if (filters.bathrooms && property.bathrooms < parseInt(filters.bathrooms)) {
      return false;
    }

    // Price range filters
    if (filters.minPrice || filters.maxPrice) {
      const priceString = property.price.replace(/[₪,]/g, '');
      const price = parseInt(priceString);
      
      if (filters.minPrice && price < parseInt(filters.minPrice)) {
        return false;
      }
      
      if (filters.maxPrice && price > parseInt(filters.maxPrice)) {
        return false;
      }
    }

    // Feature filters - for now we'll simulate these as most properties don't have this data
    // In a real app, this would check actual property features
    if (filters.features) {
      const hasActiveFeatureFilters = Object.values(filters.features).some(Boolean);
      if (hasActiveFeatureFilters) {
        // For demo purposes, we'll include properties but in reality 
        // this would filter based on actual property feature data
        console.log('Feature filters applied:', filters.features);
      }
    }

    return true;
  });

  console.log(`Filtered ${filteredProperties.length} properties from ${allProperties.length} total`);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-500" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load properties</p>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <p className="text-gray-700 font-medium">
            {filteredProperties.length} properties
            {filteredProperties.length !== allProperties.length && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                (filtered from {allProperties.length} total)
              </span>
            )}
          </p>
          <Button 
            onClick={handleScrapeData}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            Update Data
          </Button>
        </div>
        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
          <option>Sort by: Most Recent</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Size: Largest First</option>
        </select>
      </div>
      
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Database className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {allProperties.length === 0 ? 'No properties found' : 'No properties match your filters'}
          </h3>
          <p className="text-gray-600 mb-4">
            {allProperties.length === 0 
              ? 'Click "Update Data" to scrape the latest properties from remaxjerusalem.com'
              : 'Try adjusting your search filters to see more results'
            }
          </p>
          {allProperties.length === 0 && (
            <Button onClick={handleScrapeData}>
              <Database className="w-4 h-4 mr-2" />
              Scrape Properties
            </Button>
          )}
        </div>
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
