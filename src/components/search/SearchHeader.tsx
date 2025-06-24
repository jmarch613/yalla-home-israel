
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchHeaderProps {
  propertyType: string;
  location: string;
  neighborhood: string;
}

export const SearchHeader = ({ propertyType, location, neighborhood }: SearchHeaderProps) => {
  const { t } = useLanguage();

  const getResultsText = () => {
    const type = propertyType === 'buy' ? t('search.results.for.sale') : t('search.results.to.rent');
    const baseLocation = location || 'Israel';
    const fullLocation = neighborhood ? `${neighborhood}, ${baseLocation}` : baseLocation;
    
    return `${type} ${fullLocation}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {getResultsText()}
      </h1>
      <p className="text-gray-600 text-sm">
        {t('search.results.subtitle')}
      </p>
    </div>
  );
};
