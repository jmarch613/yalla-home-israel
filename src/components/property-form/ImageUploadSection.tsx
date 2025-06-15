
import React from 'react';
import { Control } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyFormData } from './PropertyFormSchema';
import { PropertyImagesUpload } from './PropertyImagesUpload';
import { FloorplanUpload } from './FloorplanUpload';

interface ImageUploadSectionProps {
  control: Control<PropertyFormData>;
}

export const ImageUploadSection = ({ control }: ImageUploadSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Photos & Floorplan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <PropertyImagesUpload />
        <FloorplanUpload control={control} />
      </CardContent>
    </Card>
  );
};
