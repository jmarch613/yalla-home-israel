
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropertyTypeFilterProps {
  propertyType: string;
  onPropertyTypeChange: (value: string) => void;
}

const propertyTypes = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'studio', label: 'Studio' }
];

export const PropertyTypeFilter = ({ 
  propertyType, 
  onPropertyTypeChange 
}: PropertyTypeFilterProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Property type</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={propertyType} onValueChange={(value) => onPropertyTypeChange(value === 'any' ? '' : value)}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Any" />
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
      </CardContent>
    </Card>
  );
};
