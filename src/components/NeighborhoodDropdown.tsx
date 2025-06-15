
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
  const city = extractCityFromLocation(selectedLocation);
  const neighborhoods = getNeighborhoodsForCity(city);
  const hasNeighborhoods = neighborhoods.length > 0;

  return (
    <div>
      <Label className="text-sm font-medium text-gray-700 mb-2 block">Neighborhood</Label>
      <Select 
        value={selectedNeighborhood} 
        onValueChange={onNeighborhoodChange}
        disabled={!hasNeighborhoods}
      >
        <SelectTrigger className="h-12">
          <SelectValue placeholder={hasNeighborhoods ? "Any neighborhood" : "Select a city first"} />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg z-50">
          <SelectItem value="">Any neighborhood</SelectItem>
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
