
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PriceRangeFilterProps {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

const priceOptions = [
  { value: '500000', label: '₪500,000' },
  { value: '750000', label: '₪750,000' },
  { value: '1000000', label: '₪1,000,000' },
  { value: '1500000', label: '₪1,500,000' },
  { value: '2000000', label: '₪2,000,000' },
  { value: '3000000', label: '₪3,000,000' },
  { value: '5000000', label: '₪5,000,000+' }
];

export const PriceRangeFilter = ({ 
  minPrice, 
  maxPrice, 
  onMinPriceChange, 
  onMaxPriceChange 
}: PriceRangeFilterProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Price range</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-gray-600">Minimum price</Label>
            <Select value={minPrice} onValueChange={onMinPriceChange}>
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
            <Select value={maxPrice} onValueChange={onMaxPriceChange}>
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
  );
};
