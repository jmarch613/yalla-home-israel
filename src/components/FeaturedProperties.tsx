
import React from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { useScrapedProperties } from '@/hooks/useScrapedProperties';
import { RefreshCw } from 'lucide-react';
import { transformProperties } from '@/utils/propertyFiltering';

export const FeaturedProperties = () => {
  const { data: scrapedProperties, isLoading } = useScrapedProperties();

  // Use the deduplication transform to ensure uniqueness
  const transformed = transformProperties(scrapedProperties);

  // Get the top 3 most expensive unique properties as featured
  const featuredProperties = transformed
    ?.sort((a, b) => {
      const priceA = parseFloat(a.price?.replace(/[^\d]/g, '') || '0');
      const priceB = parseFloat(b.price?.replace(/[^\d]/g, '') || '0');
      return priceB - priceA;
    })
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Properties</h2>
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      </div>
    );
  }

  if (!featuredProperties || featuredProperties.length === 0) {
    return null; // Don't show featured section if no properties
  }

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};
