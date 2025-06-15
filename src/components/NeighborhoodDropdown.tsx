
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getNeighborhoodsForCity, extractCityFromLocation } from '@/data/cityNeighborhoods';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedCityName } from '@/data/cityNameTranslations';

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
  const { currentLanguage } = useLanguage();
  const city = extractCityFromLocation(selectedLocation);
  const neighborhoods = getNeighborhoodsForCity(city);
  const hasNeighborhoods = neighborhoods.length > 0;

  const handleValueChange = (value: string) => {
    onNeighborhoodChange(value === "any" ? "" : value);
  };

  return (
    <div>
      <Select 
        value={selectedNeighborhood || "any"} 
        onValueChange={handleValueChange}
        disabled={!hasNeighborhoods}
      >
        <SelectTrigger className="h-10 bg-white border-gray-300">
          <SelectValue placeholder={hasNeighborhoods ? getTranslatedCityName(city, currentLanguage) + "…" : "Select a city first"} />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg z-50">
          <SelectItem value="any">
            {hasNeighborhoods ? getTranslatedCityName(city, currentLanguage) : "Any neighborhood"}
          </SelectItem>
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
