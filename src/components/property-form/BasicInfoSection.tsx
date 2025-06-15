
import React from 'react';
import { Control } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyFormData } from './PropertyFormSchema';
import { TitleSection } from './TitleSection';
import { DescriptionSection } from './DescriptionSection';
import { PricePropertyTypeSection } from './PricePropertyTypeSection';

interface BasicInfoSectionProps {
  control: Control<PropertyFormData>;
}

export const BasicInfoSection = ({ control }: BasicInfoSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TitleSection control={control} />
        <DescriptionSection control={control} />
        <PricePropertyTypeSection control={control} />
      </CardContent>
    </Card>
  );
};
