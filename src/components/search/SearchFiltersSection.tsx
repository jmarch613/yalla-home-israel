
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NeighborhoodDropdown } from '@/components/NeighborhoodDropdown';
import { SearchFilters } from '@/components/SearchFilters';

interface SearchFiltersSectionProps {
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
    };
  };
  onFilterChange: (field: string, value: string) => void;
  onNeighborhoodChange: (neighborhood: string) => void;
  onFiltersApply: () => void;
}

const propertyTypes = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'studio', label: 'Studio' }
];

export const SearchFiltersSection = ({ 
  searchFilters, 
  onFilterChange, 
  onNeighborhoodChange,
  onFiltersApply
}: SearchFiltersSectionProps) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const handleSearchClick = () => {
    console.log('Search button clicked, applying filters:', searchFilters);
    onFiltersApply();
  };

  const handleMoreFiltersApply = (filters: any) => {
    // Update all the advanced filters
    Object.keys(filters).forEach(key => {
      if (key === 'features') {
        // Handle features separately since it's an object
        // This would need to be passed up to the parent component
      } else {
        onFilterChange(key, filters[key]);
      }
    });
    onFiltersApply();
    setShowMoreFilters(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
      {/* Search radius */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">Search radius</Label>
        <Select defaultValue="this-area">
          <SelectTrigger className="h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-50">
            <SelectItem value="this-area">This area only</SelectItem>
            <SelectItem value="1-mile">Within 1 mile</SelectItem>
            <SelectItem value="3-miles">Within 3 miles</SelectItem>
            <SelectItem value="5-miles">Within 5 miles</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property types - moved before neighborhood */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">Property types</Label>
        <Select value={searchFilters.propertyType} onValueChange={(value) => onFilterChange('propertyType', value)}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-50">
            {propertyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Neighborhood dropdown - moved after property types */}
      <NeighborhoodDropdown
        selectedLocation={searchFilters.location}
        selectedNeighborhood={searchFilters.neighborhood}
        onNeighborhoodChange={onNeighborhoodChange}
      />

      {/* Added to site */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">Added to site</Label>
        <Select defaultValue="anytime">
          <SelectTrigger className="h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-50">
            <SelectItem value="anytime">Anytime</SelectItem>
            <SelectItem value="last-day">Last 24 hours</SelectItem>
            <SelectItem value="last-week">Last week</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Include checkbox */}
      <div className="flex items-center space-x-2 pt-6">
        <Checkbox id="include-stc" />
        <Label htmlFor="include-stc" className="text-sm">
          Include Under Offer, Sold STC
        </Label>
      </div>

      {/* Search and More Filters buttons */}
      <div className="flex flex-col gap-2">
        <Button 
          className="h-12 bg-green-500 hover:bg-green-600 text-white font-medium"
          onClick={handleSearchClick}
        >
          Search properties
        </Button>
        
        <Dialog open={showMoreFilters} onOpenChange={setShowMoreFilters}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-10">
              More filters
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Advanced Filters</DialogTitle>
            </DialogHeader>
            <SearchFilters onFiltersChange={handleMoreFiltersApply} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
