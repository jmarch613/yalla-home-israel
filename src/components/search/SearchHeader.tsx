
import React from 'react';

interface SearchHeaderProps {
  propertyType: string;
  location: string;
  neighborhood: string;
}

export const SearchHeader = ({ propertyType, location, neighborhood }: SearchHeaderProps) => {
  return (
    <h1 className="text-3xl font-bold mb-6">
      Find property {propertyType === 'buy' ? 'for sale' : 'to rent'} in {location || 'Israel'}
      {neighborhood && `, ${neighborhood}`}
    </h1>
  );
};
