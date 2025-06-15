
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BedroomsFilterProps {
  bedrooms: string;
  onBedroomsChange: (value: string) => void;
}

const bedroomOptions = [
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' }
];

export const BedroomsFilter = ({ 
  bedrooms, 
  onBedroomsChange 
}: BedroomsFilterProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Bedrooms</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={bedrooms} onValueChange={onBedroomsChange}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-50">
            {bedroomOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
