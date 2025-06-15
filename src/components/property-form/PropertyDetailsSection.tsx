
import React from 'react';
import { Control } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyFormData } from './PropertyFormSchema';
import { useLanguage } from '@/contexts/LanguageContext';
import { RoomDetailsFields } from './RoomDetailsFields';
import { BuildingDetailsFields } from './BuildingDetailsFields';

interface PropertyDetailsSectionProps {
  control: Control<PropertyFormData>;
}

export const PropertyDetailsSection = ({ control }: PropertyDetailsSectionProps) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('details.type')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoomDetailsFields control={control} />
        <BuildingDetailsFields control={control} />
      </CardContent>
    </Card>
  );
};
