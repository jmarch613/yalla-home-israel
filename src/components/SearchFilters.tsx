
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
}

export const SearchFilters = ({ onFiltersChange }: SearchFiltersProps) => {
  const [filters, setFilters] = useState({
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

  const priceOptions = [
    { value: '500000', label: '₪500,000' },
    { value: '750000', label: '₪750,000' },
    { value: '1000000', label: '₪1,000,000' },
    { value: '1500000', label: '₪1,500,000' },
    { value: '2000000', label: '₪2,000,000' },
    { value: '3000000', label: '₪3,000,000' },
    { value: '5000000', label: '₪5,000,000+' }
  ];

  const handleInputChange = (field: string, value: string) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const updatedFilters = {
      ...filters,
      features: {
        ...filters.features,
        [feature]: checked
      }
    };
    setFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
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
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="space-y-4">
      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-600">Minimum price</Label>
              <Select value={filters.minPrice} onValueChange={(value) => handleInputChange('minPrice', value)}>
                <SelectTrigger className="h-9">
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
            </div>
            <div>
              <Label className="text-xs text-gray-600">Maximum price</Label>
              <Select value={filters.maxPrice} onValueChange={(value) => handleInputChange('maxPrice', value)}>
                <SelectTrigger className="h-9">
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
        </CardContent>
      </Card>

      {/* Property Type */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Property type</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
            <SelectTrigger className="h-9">
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
        </CardContent>
      </Card>

      {/* Bedrooms */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Bedrooms</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
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

      {/* Features */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="parking" 
              checked={filters.features.parking}
              onCheckedChange={(checked) => handleFeatureChange('parking', checked as boolean)}
            />
            <Label htmlFor="parking" className="text-sm">Parking</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="balcony" 
              checked={filters.features.balcony}
              onCheckedChange={(checked) => handleFeatureChange('balcony', checked as boolean)}
            />
            <Label htmlFor="balcony" className="text-sm">Balcony</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="elevator" 
              checked={filters.features.elevator}
              onCheckedChange={(checked) => handleFeatureChange('elevator', checked as boolean)}
            />
            <Label htmlFor="elevator" className="text-sm">Elevator</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="garden" 
              checked={filters.features.garden}
              onCheckedChange={(checked) => handleFeatureChange('garden', checked as boolean)}
            />
            <Label htmlFor="garden" className="text-sm">Garden</Label>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 h-9"
          onClick={handleApplyFilters}
        >
          Apply filters
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-9"
          onClick={handleClearFilters}
        >
          Clear all
        </Button>
      </div>
    </div>
  );
};
