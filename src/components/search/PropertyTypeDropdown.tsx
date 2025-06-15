
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropertyTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const PropertyTypeDropdown = ({ value, onChange }: PropertyTypeDropdownProps) => {
  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'studio', label: 'Studio' }
  ];

  const handleValueChange = (selectedValue: string) => {
    onChange(selectedValue === 'any' ? '' : selectedValue);
  };

  return (
    <div className="min-w-[140px]">
      <Select value={value} onValueChange={handleValueChange}>
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
  );
};
