
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { propertySchema, type PropertyFormData } from './PropertyFormSchema';
import { PropertyListing } from '@/types/database';
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
  initialData?: PropertyListing;
}

export const PropertyForm = ({ onSubmit, isSubmitting, propertyId, initialData }: PropertyFormProps) => {
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

  // Reset form with initial data when editing
  useEffect(() => {
    if (initialData) {
      const formData = {
        title: initialData.title,
        description: initialData.description || '',
        price: initialData.price || undefined,
        property_type: initialData.property_type,
        listing_type: initialData.listing_type,
        road: initialData.address.split(' ')[0] || '',
        road_number: parseInt(initialData.address.split(' ')[1]) || 1,
        flat_number: undefined,
        entrance_number: undefined,
        neighborhood: initialData.neighborhood || '',
        city: initialData.city,
        bedrooms: initialData.bedrooms || undefined,
        bathrooms: initialData.bathrooms || undefined,
        living_rooms: initialData.living_rooms || undefined,
        area: initialData.area || undefined,
        floor_number: initialData.floor_number || undefined,
        total_floors: initialData.total_floors || undefined,
        year_built: initialData.year_built || undefined,
        parking_spots: initialData.parking_spots || 0,
        contact_name: initialData.contact_name,
        contact_phone: initialData.contact_phone,
        contact_email: initialData.contact_email || '',
        balcony: initialData.balcony || false,
        elevator: initialData.elevator || false,
        garden: initialData.garden || false,
        air_conditioning: initialData.air_conditioning || false,
        heating: initialData.heating || false,
        furnished: initialData.furnished || false,
        pets_allowed: initialData.pets_allowed || false,
        safe_room: initialData.safe_room || false,
        bomb_shelter: initialData.bomb_shelter || false,
        images: initialData.images || [],
        floorplan_url: initialData.floorplan_url || '',
      };
      form.reset(formData);
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <LocationSection control={form.control} />
        <PropertyDetailsSection control={form.control} />
        <FeaturesSection control={form.control} />
        <ImageUploadSection control={form.control} propertyId={propertyId} />
        <BasicInfoSection control={form.control} />
        <ContactSection control={form.control} />

        <div className="flex space-x-4">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? 'Updating...' : initialData ? 'Update Property' : 'Submit Property Listing'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate(initialData ? '/my-properties' : '/')}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
