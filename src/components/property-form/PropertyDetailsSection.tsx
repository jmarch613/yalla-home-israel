
import React from 'react';
import { Control } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from './PropertyFormSchema';
import { useLanguage } from '@/contexts/LanguageContext';

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
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('common.bedrooms')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('common.bathrooms')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={control}
            name="floor_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('common.floor')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="total_floors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.total.floors')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="5"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="year_built"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('common.year.built')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2020"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="parking_spots"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.parking.spots')}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
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
