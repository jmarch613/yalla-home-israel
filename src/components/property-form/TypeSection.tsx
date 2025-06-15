
import React from 'react';
import { Control } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PricePropertyTypeSection } from './PricePropertyTypeSection';
import { PropertyFormData } from './PropertyFormSchema';

interface TypeSectionProps {
  control: Control<PropertyFormData>;
}

export const TypeSection = ({ control }: TypeSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PricePropertyTypeSection control={control} />
      </CardContent>
    </Card>
  );
};
