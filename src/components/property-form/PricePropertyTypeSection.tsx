
import React from 'react';
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from './PropertyFormSchema';

interface PricePropertyTypeSectionProps {
  control: Control<PropertyFormData>;
}

export const PricePropertyTypeSection = ({ control }: PricePropertyTypeSectionProps) => {
  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price (₪)</FormLabel>
          <FormControl>
            <Input 
              type="number" 
              placeholder="Enter price" 
              {...field}
              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
