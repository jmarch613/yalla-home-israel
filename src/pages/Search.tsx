
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { PropertyGrid } from '@/components/PropertyGrid';
import { SearchHeader } from '@/components/search/SearchHeader';
import { SearchFiltersSection } from '@/components/search/SearchFiltersSection';
import { PriceBedroomFilters } from '@/components/search/PriceBedroomFilters';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    neighborhood: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    features: {
      parking: false,
      balcony: false,
      elevator: false,
      garden: false,
    }
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    const location = searchParams.get('location') || '';
    const type = searchParams.get('type') || 'buy';
    
    setSearchFilters(prev => ({
      ...prev,
      location,
      type,
      neighborhood: '' // Reset neighborhood when location changes from URL
    }));
    setSearchLocation(location);
  }, [searchParams]);

  const handleFiltersChange = (filters: typeof searchFilters) => {
    setSearchFilters(filters);
    console.log('Filtering with:', filters);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchLocation);
  };

  const handleFilterChange = (field: string, value: string) => {
    const updatedFilters = { ...searchFilters, [field]: value };
    
    // Reset neighborhood when location changes
    if (field === 'location') {
      updatedFilters.neighborhood = '';
    }
    
    setSearchFilters(updatedFilters);
    handleFiltersChange(updatedFilters);
  };

  const handleNeighborhoodChange = (neighborhood: string) => {
    const updatedFilters = { ...searchFilters, neighborhood };
    setSearchFilters(updatedFilters);
    handleFiltersChange(updatedFilters);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const propertyTypeForUrl = searchParams.get('type') || 'buy';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main search header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <SearchHeader 
            propertyType={propertyTypeForUrl}
            location={searchFilters.location}
            neighborhood={searchFilters.neighborhood}
          />
          
          {/* Rightmove-style horizontal filters */}
          <div className="space-y-4">
            {/* Main filter row */}
            <SearchFiltersSection
              searchFilters={searchFilters}
              onFilterChange={handleFilterChange}
              onNeighborhoodChange={handleNeighborhoodChange}
            />

            {/* Price and bedrooms row */}
            <PriceBedroomFilters
              searchFilters={searchFilters}
              onFilterChange={handleFilterChange}
              showFilters={showFilters}
              onToggleFilters={handleToggleFilters}
            />
          </div>
        </div>
      </div>

      {/* Property results */}
      <div className="container mx-auto px-4 py-6">
        <PropertyGrid filters={searchFilters} />
      </div>
    </div>
  );
};

export default Search;
