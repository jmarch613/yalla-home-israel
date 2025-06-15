
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PropertyListing } from '@/types/database';

export const usePhotoManager = (id: string | undefined) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<PropertyListing | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || !id) {
      navigate('/auth');
      return;
    }
    fetchProperty();
  }, [user, id, navigate]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      if (!data) {
        toast({
          title: "Property not found",
          description: "The property you're looking for doesn't exist or you don't have permission to view it.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      // Properly map the database result to PropertyListing type
      const propertyData: PropertyListing = {
        id: data.id,
        user_id: data.user_id,
        title: data.title,
        description: data.description,
        price: data.price,
        property_type: data.property_type as PropertyListing['property_type'],
        listing_type: data.listing_type as PropertyListing['listing_type'],
        address: data.address,
        neighborhood: data.neighborhood,
        city: data.city,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        living_rooms: data.living_rooms,
        area: data.area,
        floor_number: data.floor_number,
        total_floors: data.total_floors,
        year_built: data.year_built,
        parking_spots: data.parking_spots,
        contact_name: data.contact_name,
        contact_phone: data.contact_phone,
        contact_email: data.contact_email,
        balcony: data.balcony,
        elevator: data.elevator,
        garden: data.garden,
        air_conditioning: data.air_conditioning,
        heating: data.heating,
        furnished: data.furnished,
        pets_allowed: data.pets_allowed,
        safe_room: false, // Default value since this field doesn't exist in current schema
        bomb_shelter: false, // Default value since this field doesn't exist in current schema
        images: data.images,
        floorplan_url: null, // Default value since this field doesn't exist in current schema
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      setProperty(propertyData);
      setImages(data.images || []);
    } catch (error) {
      console.error('Error fetching property:', error);
      toast({
        title: "Error",
        description: "Failed to load property data.",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const reorderImages = (draggedIndex: number, dropIndex: number) => {
    if (draggedIndex === dropIndex) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    
    newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    
    setImages(newImages);
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
  };

  const saveImageOrder = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('property_listings')
        .update({ images })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Photo order has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving image order:', error);
      toast({
        title: "Error",
        description: "Failed to save photo order.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    property,
    images,
    loading,
    saving,
    reorderImages,
    removeImage,
    saveImageOrder
  };
};
