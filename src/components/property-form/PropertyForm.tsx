
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { propertySchema, type PropertyFormData } from './PropertyFormSchema';
import { BasicInfoSection } from './BasicInfoSection';
import { LocationSection } from './LocationSection';
import { PropertyDetailsSection } from './PropertyDetailsSection';
import { FeaturesSection } from './FeaturesSection';
import { ContactSection } from './ContactSection';
import { ImageUploadSection } from './ImageUploadSection';

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
  isSubmitting: boolean;
  propertyId: string | null;
}

export const PropertyForm = ({ onSubmit, isSubmitting, propertyId }: PropertyFormProps) => {
  const navigate = useNavigate();

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      listing_type: 'sale',
      property_type: 'apartment',
      parking_spots: 0,
      balcony: false,
      elevator: false,
      garden: false,
      air_conditioning: false,
      heating: false,
      furnished: false,
      pets_allowed: false,
      safe_room: false,
      bomb_shelter: false,
      images: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <LocationSection control={form.control} />
        <PropertyDetailsSection control={form.control} />
        <FeaturesSection control={form.control} />
        <ImageUploadSection control={form.control} />
        <BasicInfoSection control={form.control} />
        <ContactSection control={form.control} />

        <div className="flex space-x-4">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? 'Submitting...' : 'Submit Property Listing'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </div>
        
        {propertyId && (
          <div className="mt-4">
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
      </form>
    </Form>
  );
};
