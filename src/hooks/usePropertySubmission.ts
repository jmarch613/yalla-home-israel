
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PropertyFormData } from '@/components/property-form/PropertyFormSchema';

export const usePropertySubmission = (userId: string | undefined) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [propertyId, setPropertyId] = useState<string | null>(null);

  const submitProperty = async (data: PropertyFormData) => {
    if (!userId) {
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
        user_id: userId,
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

  return {
    isSubmitting,
    propertyId,
    submitProperty
  };
};
