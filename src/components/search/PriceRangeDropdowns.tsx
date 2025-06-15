
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();

  const priceOptions = [
    { value: '500000', label: '₪500,000' },
    { value: '750000', label: '₪750,000' },
    { value: '1000000', label: '₪1,000,000' },
    { value: '1500000', label: '₪1,500,000' },
    { value: '2000000', label: '₪2,000,000' },
    { value: '3000000', label: '₪3,000,000' },
    { value: '5000000', label: '₪5,000,000+' }
  ];

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
            <SelectValue placeholder={t('filters.price.min')} />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-50">
            <SelectItem value="any">{t('filters.price.no.min')}</SelectItem>
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
            <SelectValue placeholder={t('filters.price.max')} />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-50">
            <SelectItem value="any">{t('filters.price.no.max')}</SelectItem>
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
