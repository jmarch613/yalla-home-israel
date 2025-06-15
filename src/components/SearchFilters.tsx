
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
}

export const SearchFilters = ({ onFiltersChange }: SearchFiltersProps) => {
  const propertyTypes = [
    'Apartment', 'House', 'Villa', 'Penthouse', 'Studio', 'Duplex'
  ];

  const bedroomOptions = ['1', '2', '3', '4', '5+'];
  const bathroomOptions = ['1', '2', '3', '4+'];

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg">Search Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="location" className="text-sm font-medium">Location</Label>
          <Input id="location" placeholder="Enter city or area" className="mt-1" />
        </div>

        <div>
          <Label className="text-sm font-medium">Property Type</Label>
          <div className="mt-2 space-y-2">
            {propertyTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} />
                <Label htmlFor={type} className="text-sm">{type}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Price Range (₪)</Label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Input placeholder="Min price" />
            <Input placeholder="Max price" />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Bedrooms</Label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {bedroomOptions.map((bed) => (
              <Button key={bed} variant="outline" size="sm" className="text-xs">
                {bed}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Bathrooms</Label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {bathroomOptions.map((bath) => (
              <Button key={bath} variant="outline" size="sm" className="text-xs">
                {bath}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Additional Features</Label>
          <div className="mt-2 space-y-2">
            {['Parking', 'Balcony', 'Elevator', 'Storage', 'Garden', 'Air Conditioning'].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox id={feature} />
                <Label htmlFor={feature} className="text-sm">{feature}</Label>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
};
