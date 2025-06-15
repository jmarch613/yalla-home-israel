
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { SearchFilters } from '@/components/SearchFilters';
import { PropertyGrid } from '@/components/PropertyGrid';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { SearchHero } from '@/components/SearchHero';

const Index = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  const handleSearch = (filters: typeof searchFilters) => {
    setSearchFilters(filters);
    console.log('Searching with filters:', filters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchHero onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8">
        <FeaturedProperties />
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Properties for Sale & Rent</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <SearchFilters onFiltersChange={setSearchFilters} />
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

export default Index;
