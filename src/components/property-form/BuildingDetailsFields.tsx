
import React from 'react';
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyFormData } from './PropertyFormSchema';

interface BuildingDetailsFieldsProps {
  control: Control<PropertyFormData>;
}

export const BuildingDetailsFields = ({ control }: BuildingDetailsFieldsProps) => {
  // Generate parking options 0-15
  const parkingOptions = Array.from({ length: 16 }, (_, i) => i);
  
  // Generate floor options: Ground + 1-50
  const floorOptions = ['Ground', ...Array.from({ length: 50 }, (_, i) => i + 1)];
  
  // Generate total floors options 1-50
  const totalFloorsOptions = Array.from({ length: 50 }, (_, i) => i + 1);
  
  // Generate decade options from 1800s to present
  const currentYear = new Date().getFullYear();
  const currentDecade = Math.floor(currentYear / 10) * 10;
  const decadeOptions = [];
  
  for (let decade = 1800; decade <= currentDecade; decade += 10) {
    decadeOptions.push(`${decade}s`);
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <FormField
        control={control}
        name="floor_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Floor</FormLabel>
            <Select 
              onValueChange={(value) => field.onChange(value === 'Ground' ? 0 : (value ? parseInt(value) : undefined))} 
              value={field.value === 0 ? 'Ground' : field.value?.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select floor" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {floorOptions.map((floor) => (
                  <SelectItem key={floor} value={floor.toString()}>
                    {floor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="total_floors"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Floors</FormLabel>
            <Select onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)} value={field.value?.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select total floors" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {totalFloorsOptions.map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="year_built"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year Built</FormLabel>
            <Select onValueChange={(value) => field.onChange(value)} value={field.value?.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select decade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {decadeOptions.map((decade) => (
                  <SelectItem key={decade} value={decade}>
                    {decade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="parking_spots"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Parking Spots</FormLabel>
            <Select onValueChange={(value) => field.onChange(value ? parseInt(value) : 0)} value={field.value?.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select parking spots" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {parkingOptions.map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
