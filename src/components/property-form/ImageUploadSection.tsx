
import React from 'react';
import { Control } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PropertyFormData } from './PropertyFormSchema';
import { PropertyImagesUpload } from './PropertyImagesUpload';
import { FloorplanUpload } from './FloorplanUpload';

interface ImageUploadSectionProps {
  control: Control<PropertyFormData>;
  propertyId?: string | null;
}

export const ImageUploadSection = ({ control, propertyId }: ImageUploadSectionProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photos & Floorplan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <PropertyImagesUpload />
        <FloorplanUpload control={control} />
        
        {propertyId && (
          <div className="pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(`/property/${propertyId}/photos`)}
              className="w-full"
            >
              Manage Photos Order
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
