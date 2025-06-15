import React from 'react';
import { Control } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyFormData } from './PropertyFormSchema';
import { useLanguage } from '@/contexts/LanguageContext';

interface PropertyDetailsSectionProps {
  control: Control<PropertyFormData>;
}

export const PropertyDetailsSection = ({ control }: PropertyDetailsSectionProps) => {
  const { t } = useLanguage();

  // Generate number options 1-15
  const numberOptions = Array.from({ length: 15 }, (_, i) => i + 1);
  
  // Generate parking options 0-15
  const parkingOptions = Array.from({ length: 16 }, (_, i) => i);
  
  // Generate floor options: Ground + 1-50
  const floorOptions = ['Ground', ...Array.from({ length: 50 }, (_, i) => i + 1)];
  
  // Generate total floors options 1-50
  const totalFloorsOptions = Array.from({ length: 50 }, (_, i) => i + 1);
  
  // Generate year options from 1700 to current year
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1699 }, (_, i) => currentYear - i);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('details.type')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <Select onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)} value={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {numberOptions.map((num) => (
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
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <Select onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)} value={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bathrooms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {numberOptions.map((num) => (
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
            name="living_rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Living Rooms</FormLabel>
                <Select onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)} value={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select living rooms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {numberOptions.map((num) => (
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
                <Select onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)} value={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {yearOptions.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
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
      </CardContent>
    </Card>
  );
};
