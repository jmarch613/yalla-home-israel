
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PriceRangeFilter } from '@/components/filters/PriceRangeFilter';
import { PropertyTypeFilter } from '@/components/filters/PropertyTypeFilter';
import { BedroomsFilter } from '@/components/filters/BedroomsFilter';
import { FeaturesFilter } from '@/components/filters/FeaturesFilter';

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
}

export const SearchFilters = ({ onFiltersChange }: SearchFiltersProps) => {
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    features: {
      parking: false,
      balcony: false,
      elevator: false,
      garden: false,
    }
  });

  const handleInputChange = (field: string, value: string) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const updatedFilters = {
      ...filters,
      features: {
        ...filters.features,
        [feature]: checked
      }
    };
    setFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      location: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      features: {
        parking: false,
        balcony: false,
        elevator: false,
        garden: false,
      }
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="space-y-4">
      <PriceRangeFilter
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onMinPriceChange={(value) => handleInputChange('minPrice', value)}
        onMaxPriceChange={(value) => handleInputChange('maxPrice', value)}
      />

      <PropertyTypeFilter
        propertyType={filters.propertyType}
        onPropertyTypeChange={(value) => handleInputChange('propertyType', value)}
      />

      <BedroomsFilter
        bedrooms={filters.bedrooms}
        onBedroomsChange={(value) => handleInputChange('bedrooms', value)}
      />

      <FeaturesFilter
        features={filters.features}
        onFeatureChange={handleFeatureChange}
      />

      <div className="space-y-2">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 h-9"
          onClick={handleApplyFilters}
        >
          Apply filters
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-9"
          onClick={handleClearFilters}
        >
          Clear all
        </Button>
      </div>
    </div>
  );
};
