
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { SearchFilters } from '@/components/SearchFilters';
import { PropertyGrid } from '@/components/PropertyGrid';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  useEffect(() => {
    // Get location and type from URL parameters
    const location = searchParams.get('location') || '';
    const type = searchParams.get('type') || 'buy';
    
    setSearchFilters(prev => ({
      ...prev,
      location,
      type
    }));
  }, [searchParams]);

  const handleFiltersChange = (filters: typeof searchFilters) => {
    setSearchFilters(filters);
    console.log('Filtering with:', filters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Properties in {searchFilters.location || 'Israel'}
          </h1>
          <p className="text-gray-600">
            Find your perfect home for {searchParams.get('type') || 'buy'}
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">All Properties</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <SearchFilters onFiltersChange={handleFiltersChange} />
            </div>
            <div className="lg:col-span-3">
              <PropertyGrid filters={searchFilters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
