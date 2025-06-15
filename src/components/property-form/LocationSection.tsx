
import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Autocomplete } from '@/components/ui/autocomplete';
import { NeighborhoodDropdown } from '@/components/NeighborhoodDropdown';
import { israeliLocations } from '@/data/israeliLocations';
import { israeliStreets } from '@/data/israeliStreets';
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

  const neighborhoodValue = useWatch({
    control,
    name: 'neighborhood',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="road"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Road/Street Name</FormLabel>
                <FormControl>
                  <Autocomplete
                    value={field.value || ''}
                    onChange={field.onChange}
                    placeholder="Enter street name"
                    suggestions={israeliStreets}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="road_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Road Number</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="123" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="flat_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flat Number (if applicable)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="5" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="entrance_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entrance Number (if applicable)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="A or 1" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                <div>
                  <NeighborhoodDropdown
                    selectedLocation={cityValue || ''}
                    selectedNeighborhood={neighborhoodValue || ''}
                    onNeighborhoodChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
