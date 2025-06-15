
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

interface PropertyTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const PropertyTypeDropdown = ({ value, onChange }: PropertyTypeDropdownProps) => {
  const { t } = useLanguage();

  const propertyTypes = [
    { value: 'apartment', label: t('filters.property.apartment') },
    { value: 'house', label: t('filters.property.house') },
    { value: 'villa', label: t('filters.property.villa') },
    { value: 'penthouse', label: t('filters.property.penthouse') },
    { value: 'studio', label: t('filters.property.studio') }
  ];

  const handleValueChange = (selectedValue: string) => {
    onChange(selectedValue === 'any' ? '' : selectedValue);
  };

  return (
    <div className="min-w-[140px]">
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="h-10 bg-white border-gray-300">
          <SelectValue placeholder={t('filters.property.type')} />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg z-50">
          <SelectItem value="any">{t('filters.property.any')}</SelectItem>
          {propertyTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
