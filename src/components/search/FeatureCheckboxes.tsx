
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

interface FeatureCheckboxesProps {
  features: {
    parking: boolean;
    balcony: boolean;
    elevator: boolean;
    garden: boolean;
    safeRoom: boolean;
    bombShelter: boolean;
  };
  onFeatureChange: (key: string, checked: boolean) => void;
}

export const FeatureCheckboxes = ({ features, onFeatureChange }: FeatureCheckboxesProps) => {
  const { t } = useLanguage();

  const featureOptions = [
    { key: 'parking', label: t('filters.parking') },
    { key: 'balcony', label: t('filters.balcony') },
    { key: 'safeRoom', label: t('filters.safe.room') },
    { key: 'bombShelter', label: t('filters.bomb.shelter') },
    { key: 'elevator', label: t('filters.elevator') },
    { key: 'garden', label: t('filters.garden') },
  ];

  return (
    <div className="border-t pt-4">
      <div className="flex flex-wrap items-center gap-6">
        {featureOptions.map((option) => (
          <div key={option.key} className="flex items-center space-x-2">
            <Checkbox 
              id={option.key}
              checked={features[option.key as keyof typeof features]}
              onCheckedChange={(checked) => onFeatureChange(option.key, checked as boolean)}
            />
            <Label htmlFor={option.key} className="text-sm font-normal">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
