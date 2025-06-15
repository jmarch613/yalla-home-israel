
import React from 'react';
import { Button } from '@/components/ui/button';
import { NeighborhoodDropdown } from '@/components/NeighborhoodDropdown';
import { PropertyTypeDropdown } from './PropertyTypeDropdown';
import { PriceRangeDropdowns } from './PriceRangeDropdowns';
import { BedroomsDropdown } from './BedroomsDropdown';
import { FeatureCheckboxes } from './FeatureCheckboxes';

interface SearchFiltersBarProps {
  searchFilters: {
    location: string;
    neighborhood: string;
    propertyType: string;
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
    bathrooms: string;
    features: {
      parking: boolean;
      balcony: boolean;
      elevator: boolean;
      garden: boolean;
      safeRoom: boolean;
      bombShelter: boolean;
    };
  };
  onFiltersChange: (filters: any) => void;
  onFiltersApply: () => void;
}

export const SearchFiltersBar = ({ 
  searchFilters, 
  onFiltersChange, 
  onFiltersApply 
}: SearchFiltersBarProps) => {
  const handleFilterChange = (field: string, value: string) => {
    const updatedFilters = { ...searchFilters, [field]: value };
    
    if (field === 'location') {
      updatedFilters.neighborhood = '';
    }
    
    onFiltersChange(updatedFilters);
  };

  const handleNeighborhoodChange = (neighborhood: string) => {
    const updatedFilters = { ...searchFilters, neighborhood };
    onFiltersChange(updatedFilters);
  };

  const handleFeatureChange = (key: string, checked: boolean) => {
    const updatedFilters = {
      ...searchFilters,
      features: {
        ...searchFilters.features,
        [key]: checked
      }
    };
    onFiltersChange(updatedFilters);
  };

  return (
    <div className="py-4 space-y-4">
      {/* Main filters row */}
      <div className="flex flex-wrap items-center gap-4">
        <PropertyTypeDropdown
          value={searchFilters.propertyType}
          onChange={(value) => handleFilterChange('propertyType', value)}
        />

        <div className="min-w-[140px]">
          <NeighborhoodDropdown
            selectedLocation={searchFilters.location}
            selectedNeighborhood={searchFilters.neighborhood}
            onNeighborhoodChange={handleNeighborhoodChange}
          />
        </div>

        <PriceRangeDropdowns
          minPrice={searchFilters.minPrice}
          maxPrice={searchFilters.maxPrice}
          onMinPriceChange={(value) => handleFilterChange('minPrice', value)}
          onMaxPriceChange={(value) => handleFilterChange('maxPrice', value)}
        />

        <BedroomsDropdown
          value={searchFilters.bedrooms}
          onChange={(value) => handleFilterChange('bedrooms', value)}
        />

        {/* Search Button */}
        <Button 
          className="h-10 bg-blue-600 hover:bg-blue-700 text-white px-6"
          onClick={onFiltersApply}
        >
          Search
        </Button>
      </div>

      {/* Feature filters row */}
      <FeatureCheckboxes
        features={searchFilters.features}
        onFeatureChange={handleFeatureChange}
      />
    </div>
  );
};
