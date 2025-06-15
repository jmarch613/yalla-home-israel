
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { PropertyGrid } from '@/components/PropertyGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, MapPin, SlidersHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchFilters, setSearchFilters] = useState({
    location: '',
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

  const handleFilterChange = (field: string, value: string) => {
    const updatedFilters = { ...searchFilters, [field]: value };
    setSearchFilters(updatedFilters);
    handleFiltersChange(updatedFilters);
  };

  const propertyTypeForUrl = searchParams.get('type') || 'buy';

  const priceOptions = [
    { value: '500000', label: '₪500,000' },
    { value: '750000', label: '₪750,000' },
    { value: '1000000', label: '₪1,000,000' },
    { value: '1500000', label: '₪1,500,000' },
    { value: '2000000', label: '₪2,000,000' },
    { value: '3000000', label: '₪3,000,000' },
    { value: '5000000', label: '₪5,000,000+' }
  ];

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'studio', label: 'Studio' }
  ];

  const bedroomOptions = [
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main search header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">
            Find property {propertyTypeForUrl === 'buy' ? 'for sale' : 'to rent'} in {searchFilters.location || 'Israel'}
          </h1>
          
          {/* Rightmove-style horizontal filters */}
          <div className="space-y-4">
            {/* Main filter row */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
              {/* Search radius */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Search radius</Label>
                <Select defaultValue="this-area">
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    <SelectItem value="this-area">This area only</SelectItem>
                    <SelectItem value="1-mile">Within 1 mile</SelectItem>
                    <SelectItem value="3-miles">Within 3 miles</SelectItem>
                    <SelectItem value="5-miles">Within 5 miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property types */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Property types</Label>
                <Select value={searchFilters.propertyType} onValueChange={(value) => handleFilterChange('propertyType', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Added to site */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Added to site</Label>
                <Select defaultValue="anytime">
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    <SelectItem value="anytime">Anytime</SelectItem>
                    <SelectItem value="last-day">Last 24 hours</SelectItem>
                    <SelectItem value="last-week">Last week</SelectItem>
                    <SelectItem value="last-month">Last month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Include checkbox */}
              <div className="flex items-center space-x-2 pt-6">
                <Checkbox id="include-stc" />
                <Label htmlFor="include-stc" className="text-sm">
                  Include Under Offer, Sold STC
                </Label>
              </div>

              {/* Search button */}
              <Button className="h-12 bg-green-500 hover:bg-green-600 text-white font-medium">
                Search properties
              </Button>
            </div>

            {/* Price and bedrooms row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              {/* Price range */}
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Price range (₪)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={searchFilters.minPrice} onValueChange={(value) => handleFilterChange('minPrice', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="No min" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      {priceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={searchFilters.maxPrice} onValueChange={(value) => handleFilterChange('maxPrice', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="No max" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      {priceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Number of bedrooms */}
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">No. of bedrooms</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={searchFilters.bedrooms} onValueChange={(value) => handleFilterChange('bedrooms', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="No min" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      {bedroomOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select defaultValue="">
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="No max" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      {bedroomOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional filters toggle */}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-12 px-4"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  More filters
                </Button>
              </div>
            </div>
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
