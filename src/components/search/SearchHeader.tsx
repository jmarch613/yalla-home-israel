
import React from 'react';

interface SearchHeaderProps {
  propertyType: string;
  location: string;
  neighborhood: string;
}

export const SearchHeader = ({ propertyType, location, neighborhood }: SearchHeaderProps) => {
  const getResultsText = () => {
    const type = propertyType === 'buy' ? 'Property for sale in' : 'Property to rent in';
    const baseLocation = location || 'Israel';
    const fullLocation = neighborhood ? `${neighborhood}, ${baseLocation}` : baseLocation;
    
    return `${type} ${fullLocation}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {getResultsText()}
      </h1>
      <p className="text-gray-600 text-sm">
        Search properties to find your perfect home
      </p>
    </div>
  );
};
