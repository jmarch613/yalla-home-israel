
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { PropertyListing } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export const useMyProperties = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: properties, isLoading, error, refetch } = useQuery({
    queryKey: ['user_properties', user?.id],
    queryFn: async (): Promise<PropertyListing[]> => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return (data ?? []).map(item => ({
        id: item.id,
        user_id: item.user_id,
        title: item.title,
        description: item.description,
        price: item.price,
        property_type: item.property_type,
        listing_type: item.listing_type,
        address: item.address,
        neighborhood: item.neighborhood,
        city: item.city,
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        living_rooms: item.living_rooms,
        area: item.area,
        floor_number: item.floor_number,
        total_floors: item.total_floors,
        year_built: item.year_built,
        parking_spots: item.parking_spots,
        contact_name: item.contact_name,
        contact_phone: item.contact_phone,
        contact_email: item.contact_email,
        balcony: item.balcony,
        elevator: item.elevator,
        garden: item.garden,
        air_conditioning: item.air_conditioning,
        heating: item.heating,
        furnished: item.furnished,
        pets_allowed: item.pets_allowed,
        safe_room: item.safe_room || false,
        bomb_shelter: item.bomb_shelter || false,
        images: item.images,
        floorplan_url: item.floorplan_url,
        status: item.status,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })) as PropertyListing[];
    },
    enabled: !!user,
  });

  const handleDelete = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase
        .from('property_listings')
        .delete()
        .eq('id', propertyId)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Property deleted",
        description: "Your property has been successfully deleted.",
      });

      refetch();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStatusUpdate = async (propertyId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('property_listings')
        .update({ status: newStatus })
        .eq('id', propertyId)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Property status has been updated to ${newStatus.replace('_', ' ')}.`,
      });

      refetch();
    } catch (error) {
      console.error('Error updating property status:', error);
      toast({
        title: "Error",
        description: "Failed to update property status. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    properties,
    isLoading,
    error,
    refetch,
    handleDelete,
    handleStatusUpdate,
  };
};
