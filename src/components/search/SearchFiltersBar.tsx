
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { MoreFiltersDialog } from '@/components/search/MoreFiltersDialog';
import { NeighborhoodDropdown } from '@/components/NeighborhoodDropdown';

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

const propertyTypes = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'studio', label: 'Studio' }
];

const priceOptions = [
  { value: '500000', label: '₪500,000' },
  { value: '750000', label: '₪750,000' },
  { value: '1000000', label: '₪1,000,000' },
  { value: '1500000', label: '₪1,500,000' },
  { value: '2000000', label: '₪2,000,000' },
  { value: '3000000', label: '₪3,000,000' },
  { value: '5000000', label: '₪5,000,000+' }
];

const bedroomOptions = [
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' }
];

export const SearchFiltersBar = ({ 
  searchFilters, 
  onFiltersChange, 
  onFiltersApply 
}: SearchFiltersBarProps) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

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

  const handleMoreFiltersApply = (features: any) => {
    const updatedFilters = {
      ...searchFilters,
      features
    };
    onFiltersChange(updatedFilters);
    onFiltersApply();
    setShowMoreFilters(false);
  };

  const activeFiltersCount = Object.values(searchFilters.features).filter(Boolean).length;

  return (
    <div className="py-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Property Type */}
        <div className="min-w-[140px]">
          <Select value={searchFilters.propertyType} onValueChange={(value) => handleFilterChange('propertyType', value === 'any' ? '' : value)}>
            <SelectTrigger className="h-10 bg-white border-gray-300">
              <SelectValue placeholder="Property type" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="any">Any</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Neighborhood */}
        <div className="min-w-[140px]">
          <NeighborhoodDropdown
            selectedLocation={searchFilters.location}
            selectedNeighborhood={searchFilters.neighborhood}
            onNeighborhoodChange={handleNeighborhoodChange}
          />
        </div>

        {/* Min Price */}
        <div className="min-w-[120px]">
          <Select value={searchFilters.minPrice} onValueChange={(value) => handleFilterChange('minPrice', value === 'any' ? '' : value)}>
            <SelectTrigger className="h-10 bg-white border-gray-300">
              <SelectValue placeholder="Min price" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="any">No min</SelectItem>
              {priceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Max Price */}
        <div className="min-w-[120px]">
          <Select value={searchFilters.maxPrice} onValueChange={(value) => handleFilterChange('maxPrice', value === 'any' ? '' : value)}>
            <SelectTrigger className="h-10 bg-white border-gray-300">
              <SelectValue placeholder="Max price" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="any">No max</SelectItem>
              {priceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div className="min-w-[110px]">
          <Select value={searchFilters.bedrooms} onValueChange={(value) => handleFilterChange('bedrooms', value === 'any' ? '' : value)}>
            <SelectTrigger className="h-10 bg-white border-gray-300">
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="any">Any</SelectItem>
              {bedroomOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* More Filters Button */}
        <Dialog open={showMoreFilters} onOpenChange={setShowMoreFilters}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-10 border-gray-300 bg-white relative">
              More filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-white">
            <DialogHeader>
              <DialogTitle>More filters</DialogTitle>
            </DialogHeader>
            <MoreFiltersDialog 
              features={searchFilters.features}
              onApply={handleMoreFiltersApply}
            />
          </DialogContent>
        </Dialog>

        {/* Search Button */}
        <Button 
          className="h-10 bg-blue-600 hover:bg-blue-700 text-white px-6"
          onClick={onFiltersApply}
        >
          Search
        </Button>
      </div>
    </div>
  );
};
