
import React from 'react';
import { Control } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { PropertyFormData } from './PropertyFormSchema';

interface FeaturesSectionProps {
  control: Control<PropertyFormData>;
}

export const FeaturesSection = ({ control }: FeaturesSectionProps) => {
  const features = [
    { name: 'balcony', label: 'Balcony' },
    { name: 'elevator', label: 'Elevator' },
    { name: 'garden', label: 'Garden' },
    { name: 'air_conditioning', label: 'Air Conditioning' },
    { name: 'heating', label: 'Heating' },
    { name: 'furnished', label: 'Furnished' },
    { name: 'pets_allowed', label: 'Pets Allowed' },
    { name: 'safe_room', label: 'Safe Room' },
    { name: 'bomb_shelter', label: 'Bomb Shelter' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <FormField
              key={feature.name}
              control={control}
              name={feature.name as keyof PropertyFormData}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value as boolean}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {feature.label}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
