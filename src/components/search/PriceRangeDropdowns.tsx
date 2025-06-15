
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency } from '@/contexts/CurrencyContext';

interface PriceRangeDropdownsProps {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export const PriceRangeDropdowns = ({ 
  minPrice, 
  maxPrice, 
  onMinPriceChange, 
  onMaxPriceChange 
}: PriceRangeDropdownsProps) => {
  const { convertPrice, getCurrencySymbol, selectedCurrency } = useCurrency();

  // Base price options in ILS
  const basePriceOptions = [
    { value: '500000', ilsPrice: '₪500,000' },
    { value: '750000', ilsPrice: '₪750,000' },
    { value: '1000000', ilsPrice: '₪1,000,000' },
    { value: '1500000', ilsPrice: '₪1,500,000' },
    { value: '2000000', ilsPrice: '₪2,000,000' },
    { value: '3000000', ilsPrice: '₪3,000,000' },
    { value: '5000000', ilsPrice: '₪5,000,000+' }
  ];

  // Convert prices to selected currency for display
  const priceOptions = basePriceOptions.map(option => ({
    ...option,
    label: convertPrice(option.ilsPrice)
  }));

  const handleMinPriceChange = (value: string) => {
    onMinPriceChange(value === 'any' ? '' : value);
  };

  const handleMaxPriceChange = (value: string) => {
    onMaxPriceChange(value === 'any' ? '' : value);
  };

  return (
    <>
      {/* Min Price */}
      <div className="min-w-[120px]">
        <Select value={minPrice} onValueChange={handleMinPriceChange}>
          <SelectTrigger className="h-10 bg-white border-gray-300">
            <SelectValue placeholder="Min Price" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-50">
            <SelectItem value="any">No Min</SelectItem>
            {priceOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Max Price */}
      <div className="min-w-[120px]">
        <Select value={maxPrice} onValueChange={handleMaxPriceChange}>
          <SelectTrigger className="h-10 bg-white border-gray-300">
            <SelectValue placeholder="Max Price" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-50">
            <SelectItem value="any">No Max</SelectItem>
            {priceOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
