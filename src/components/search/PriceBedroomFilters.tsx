
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PriceBedroomFiltersProps {
  searchFilters: {
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
  };
  onFilterChange: (field: string, value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const PriceBedroomFilters = ({ 
  searchFilters, 
  onFilterChange, 
  showFilters, 
  onToggleFilters 
}: PriceBedroomFiltersProps) => {
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

  const bedroomOptions = [
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
      {/* Price range */}
      <div className="md:col-span-2">
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          {t('common.price')} (₪)
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Select value={searchFilters.minPrice} onValueChange={(value) => onFilterChange('minPrice', value === 'any' ? '' : value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={t('filters.price.no.min')} />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="any">{t('filters.property.any')}</SelectItem>
              {priceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={searchFilters.maxPrice} onValueChange={(value) => onFilterChange('maxPrice', value === 'any' ? '' : value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={t('filters.price.no.max')} />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="any">{t('filters.property.any')}</SelectItem>
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
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          {t('common.bedrooms')}
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Select value={searchFilters.bedrooms} onValueChange={(value) => onFilterChange('bedrooms', value === 'any' ? '' : value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={t('filters.price.no.min')} />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="any">{t('filters.property.any')}</SelectItem>
              {bedroomOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="">
            <SelectTrigger className="h-12">
              <SelectValue placeholder={t('filters.price.no.max')} />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="any">{t('filters.property.any')}</SelectItem>
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
          onClick={onToggleFilters}
          className="h-12 px-4"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          {t('filters.more')}
        </Button>
      </div>
    </div>
  );
};
