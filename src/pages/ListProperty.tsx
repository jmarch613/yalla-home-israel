import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { propertySchema, type PropertyFormData } from '@/components/property-form/PropertyFormSchema';
import { BasicInfoSection } from '@/components/property-form/BasicInfoSection';
import { LocationSection } from '@/components/property-form/LocationSection';
import { PropertyDetailsSection } from '@/components/property-form/PropertyDetailsSection';
import { FeaturesSection } from '@/components/property-form/FeaturesSection';
import { ContactSection } from '@/components/property-form/ContactSection';
import { ImageUploadSection } from '@/components/property-form/ImageUploadSection';
import { supabase } from '@/integrations/supabase/client';

const ListProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [propertyId, setPropertyId] = useState<string | null>(null);

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

  const onSubmit = async (data: PropertyFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to list a property.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setIsSubmitting(true);

    try {
      // Construct the full address from the new fields
      const addressParts = [
        data.road,
        data.road_number?.toString(),
        data.flat_number ? `Apt ${data.flat_number}` : null,
        data.entrance_number ? `Entrance ${data.entrance_number}` : null
      ].filter(Boolean);
      
      const fullAddress = addressParts.join(', ');

      const insertData = {
        user_id: user.id,
        title: data.title,
        description: data.description || null,
        price: data.price || null,
        property_type: data.property_type,
        listing_type: data.listing_type,
        address: fullAddress,
        neighborhood: data.neighborhood || null,
        city: data.city,
        bedrooms: data.bedrooms || null,
        bathrooms: data.bathrooms || null,
        living_rooms: data.living_rooms || null,
        area: data.area || null,
        floor_number: data.floor_number || null,
        total_floors: data.total_floors || null,
        year_built: data.year_built || null,
        parking_spots: data.parking_spots || 0,
        contact_name: data.contact_name,
        contact_phone: data.contact_phone,
        contact_email: data.contact_email || null,
        balcony: data.balcony || false,
        elevator: data.elevator || false,
        garden: data.garden || false,
        air_conditioning: data.air_conditioning || false,
        heating: data.heating || false,
        furnished: data.furnished || false,
        pets_allowed: data.pets_allowed || false,
        safe_room: data.safe_room || false,
        bomb_shelter: data.bomb_shelter || false,
        images: data.images || [],
        floorplan_url: data.floorplan_url || null,
      };

      const { data: result, error } = await supabase
        .from('property_listings')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      setPropertyId(result.id);

      toast({
        title: "Property listed successfully!",
        description: "Your property has been submitted for review.",
      });

      navigate('/');
    } catch (error) {
      console.error('Error submitting property:', error);
      toast({
        title: "Error",
        description: "Failed to submit property listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Sign In Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                You need to sign in to list a property.
              </p>
              <Button onClick={() => navigate('/auth')} className="w-full">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">List Your Property</h1>
          
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
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
