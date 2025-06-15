import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { PropertyGrid } from '@/components/PropertyGrid';
import { SearchHeader } from '@/components/search/SearchHeader';
import { SearchFiltersBar } from '@/components/search/SearchFiltersBar';
import { BackToTopButton } from '@/components/BackToTopButton';

const Search = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
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
      safeRoom: false,
      bombShelter: false,
    }
  });
  const [appliedFilters, setAppliedFilters] = useState(searchFilters);
  const [searchLocation, setSearchLocation] = useState('');
  const [sort, setSort] = useState('most-recent');

  useEffect(() => {
    const location = searchParams.get('location') || '';
    const type = searchParams.get('type') || 'buy';
    
    const initialFilters = {
      ...searchFilters,
      location,
      type,
      neighborhood: ''
    };
    
    setSearchFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setSearchLocation(location);
  }, [searchParams]);

  // Restore scroll position when returning from property details
  useEffect(() => {
    const restoreScrollPosition = location.state?.restoreScrollPosition;
    if (restoreScrollPosition) {
      console.log('Restoring scroll position to:', restoreScrollPosition);
      setTimeout(() => {
        window.scrollTo(0, restoreScrollPosition);
      }, 100);
    }
  }, [location.state]);

  const handleFiltersChange = (filters: typeof searchFilters) => {
    setSearchFilters(filters);
    console.log('Filters updated:', filters);
  };

  const handleFiltersApply = () => {
    console.log('Applying filters:', searchFilters);
    setAppliedFilters({ ...searchFilters });
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  const propertyTypeForUrl = searchParams.get('type') || 'buy';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <SearchHeader 
            propertyType={propertyTypeForUrl}
            location={searchFilters.location}
            neighborhood={searchFilters.neighborhood}
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <SearchFiltersBar
            searchFilters={searchFilters}
            onFiltersChange={handleFiltersChange}
            onFiltersApply={handleFiltersApply}
          />
        </div>
      </div>

      {/* Property results */}
      <div className="container mx-auto px-4 py-6">
        <PropertyGrid 
          filters={appliedFilters} 
          sort={sort}
          onSortChange={handleSortChange}
        />
      </div>

      <BackToTopButton />
    </div>
  );
};

export default Search;
