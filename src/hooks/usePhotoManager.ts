
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
        ...data,
        property_type: data.property_type as PropertyListing['property_type'],
        listing_type: data.listing_type as PropertyListing['listing_type'],
        floorplan_url: null // Set default value since it's not in the database yet
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
