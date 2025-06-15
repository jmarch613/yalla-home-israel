import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bed, Bath, Sofa } from 'lucide-react';

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
    livingRooms: '',
    features: {
      parking: false,
      balcony: false,
      elevator: false,
      storage: false,
      garden: false,
      airConditioning: false,
      safeRoom: false,
      bombShelter: false,
    }
  });

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'studio', label: 'Studio' },
    { value: 'duplex', label: 'Duplex' }
  ];

  const bedroomOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5+' }
  ];

  const bathroomOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4+' }
  ];

  const livingRoomOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4+' }
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
      livingRooms: '',
      features: {
        parking: false,
        balcony: false,
        elevator: false,
        storage: false,
        garden: false,
        airConditioning: false,
        safeRoom: false,
        bombShelter: false,
      }
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg">Search Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="location" className="text-sm font-medium">Location</Label>
          <Input 
            id="location" 
            placeholder="Enter city or area" 
            className="mt-1"
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Property Type</Label>
          <Select value={filters.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select property type" />
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

        <div>
          <Label className="text-sm font-medium">Price Range (₪)</Label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Input 
              placeholder="Min price" 
              value={filters.minPrice}
              onChange={(e) => handleInputChange('minPrice', e.target.value)}
            />
            <Input 
              placeholder="Max price" 
              value={filters.maxPrice}
              onChange={(e) => handleInputChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Rooms</Label>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Bed className="w-4 h-4" />
                <span>Bedrooms</span>
              </div>
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
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Bath className="w-4 h-4" />
                <span>Bathrooms</span>
              </div>
              <Select value={filters.bathrooms} onValueChange={(value) => handleInputChange('bathrooms', value)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  {bathroomOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Sofa className="w-4 h-4" />
                <span>Living Rooms</span>
              </div>
              <Select value={filters.livingRooms} onValueChange={(value) => handleInputChange('livingRooms', value)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  {livingRoomOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Features</Label>
          <div className="mt-2 space-y-3">
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
                id="storage" 
                checked={filters.features.storage}
                onCheckedChange={(checked) => handleFeatureChange('storage', checked as boolean)}
              />
              <Label htmlFor="storage" className="text-sm">Storage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="garden" 
                checked={filters.features.garden}
                onCheckedChange={(checked) => handleFeatureChange('garden', checked as boolean)}
              />
              <Label htmlFor="garden" className="text-sm">Garden</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="airConditioning" 
                checked={filters.features.airConditioning}
                onCheckedChange={(checked) => handleFeatureChange('airConditioning', checked as boolean)}
              />
              <Label htmlFor="airConditioning" className="text-sm">Air Conditioning</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="safeRoom" 
                checked={filters.features.safeRoom}
                onCheckedChange={(checked) => handleFeatureChange('safeRoom', checked as boolean)}
              />
              <Label htmlFor="safeRoom" className="text-sm">Safe Room</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="bombShelter" 
                checked={filters.features.bombShelter}
                onCheckedChange={(checked) => handleFeatureChange('bombShelter', checked as boolean)}
              />
              <Label htmlFor="bombShelter" className="text-sm">Bomb Shelter</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
