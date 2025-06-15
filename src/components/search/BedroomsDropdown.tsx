
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

interface BedroomsDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const BedroomsDropdown = ({ value, onChange }: BedroomsDropdownProps) => {
  const { t } = useLanguage();

  const bedroomOptions = [
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' }
  ];

  const handleValueChange = (selectedValue: string) => {
    onChange(selectedValue === 'any' ? '' : selectedValue);
  };

  return (
    <div className="min-w-[110px]">
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="h-10 bg-white border-gray-300">
          <SelectValue placeholder={t('filters.bedrooms')} />
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
  );
};
