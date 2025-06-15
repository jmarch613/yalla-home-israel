
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { SearchFilters } from '@/components/SearchFilters';
import { PropertyGrid } from '@/components/PropertyGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, MapPin, SlidersHorizontal } from 'lucide-react';

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
  const [showFilters, setShowFilters] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    // Get location and type from URL parameters
    const location = searchParams.get('location') || '';
    const type = searchParams.get('type') || 'buy';
    
    setSearchFilters(prev => ({
      ...prev,
      location,
      type
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

  const propertyTypeForUrl = searchParams.get('type') || 'buy';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Rightmove-style search header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1">
              <div className="flex gap-2 mb-2">
                <Button
                  variant={propertyTypeForUrl === 'buy' ? 'default' : 'outline'}
                  size="sm"
                  className="h-8"
                >
                  For sale
                </Button>
                <Button
                  variant={propertyTypeForUrl === 'rent' ? 'default' : 'outline'}
                  size="sm"
                  className="h-8"
                >
                  To rent
                </Button>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 max-w-md">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="e.g. Oxford Street, London"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10 h-10"
                  />
                </div>
                <Button onClick={handleSearch} className="h-10 px-6">
                  <SearchIcon className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-10 md:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Property {propertyTypeForUrl === 'buy' ? 'for sale' : 'to rent'} in {searchFilters.location || 'Israel'}
          </h1>
          <p className="text-gray-600 text-sm">
            Find properties {propertyTypeForUrl === 'buy' ? 'for sale' : 'to rent'} in {searchFilters.location || 'Israel'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Filters sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <SearchFilters onFiltersChange={handleFiltersChange} />
          </div>
          
          {/* Property results */}
          <div className="lg:col-span-4">
            <PropertyGrid filters={searchFilters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
