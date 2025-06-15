
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { getNeighborhoodsForCity, extractCityFromLocation } from '@/data/cityNeighborhoods';

interface NeighborhoodDropdownProps {
  selectedLocation: string;
  selectedNeighborhood: string;
  onNeighborhoodChange: (neighborhood: string) => void;
}

export const NeighborhoodDropdown = ({
  selectedLocation,
  selectedNeighborhood,
  onNeighborhoodChange
}: NeighborhoodDropdownProps) => {
  const cityName = extractCityFromLocation(selectedLocation);
  const neighborhoods = getNeighborhoodsForCity(cityName);

  const handleNeighborhoodChange = (value: string) => {
    onNeighborhoodChange(value === 'any' ? '' : value);
  };

  return (
    <div>
      <Label className="text-sm font-medium text-gray-700 mb-2 block">Neighborhood</Label>
      <Select 
        value={selectedNeighborhood || 'any'} 
        onValueChange={handleNeighborhoodChange}
        disabled={!selectedLocation || neighborhoods.length === 0}
      >
        <SelectTrigger className="h-12">
          <SelectValue placeholder="Neighborhood" />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg z-50">
          <SelectItem value="any">Any</SelectItem>
          {neighborhoods.map((neighborhood) => (
            <SelectItem key={neighborhood} value={neighborhood}>
              {neighborhood}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
