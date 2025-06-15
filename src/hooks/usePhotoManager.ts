
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PropertyListing } from '@/types/database';

export const usePhotoManager = (propertyId: string) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: async (): Promise<PropertyListing> => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (error) throw error;
      
      return {
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
        safe_room: data.safe_room || false,
        bomb_shelter: data.bomb_shelter || false,
        images: data.images || [],
        floorplan_url: data.floorplan_url,
        status: data.status as PropertyListing['status'],
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    },
  });

  const updateImagesMutation = useMutation({
    mutationFn: async (newImages: string[]) => {
      const { error } = await supabase
        .from('property_listings')
        .update({ images: newImages })
        .eq('id', propertyId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property', propertyId] });
      toast({
        title: "Success",
        description: "Property images updated successfully",
      });
    },
    onError: (error) => {
      console.error('Error updating images:', error);
      toast({
        title: "Error",
        description: "Failed to update property images",
        variant: "destructive",
      });
    },
  });

  const uploadImages = async (files: File[]) => {
    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `property-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      const currentImages = property?.images || [];
      const newImages = [...currentImages, ...uploadedUrls];
      
      await updateImagesMutation.mutateAsync(newImages);
      
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = async (imageUrl: string) => {
    if (!property) return;
    
    const newImages = property.images.filter(img => img !== imageUrl);
    await updateImagesMutation.mutateAsync(newImages);
  };

  return {
    property,
    isLoading,
    isUploading,
    uploadImages,
    removeImage,
  };
};
