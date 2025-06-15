
import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Autocomplete } from '@/components/ui/autocomplete';
import { israeliLocations } from '@/data/israeliLocations';
import { getNeighborhoodsForCity, extractCityFromLocation } from '@/data/cityNeighborhoods';
import { PropertyFormData } from './PropertyFormSchema';

interface LocationSectionProps {
  control: Control<PropertyFormData>;
}

export const LocationSection = ({ control }: LocationSectionProps) => {
  // Watch the city field to get neighborhoods
  const cityValue = useWatch({
    control,
    name: 'city',
  });

  const availableNeighborhoods = getNeighborhoodsForCity(extractCityFromLocation(cityValue || ''));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Autocomplete
                  value={field.value || ''}
                  onChange={field.onChange}
                  placeholder="Enter city name"
                  suggestions={israeliLocations}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Neighborhood</FormLabel>
              <FormControl>
                <Autocomplete
                  value={field.value || ''}
                  onChange={field.onChange}
                  placeholder="Enter neighborhood name"
                  suggestions={availableNeighborhoods}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
