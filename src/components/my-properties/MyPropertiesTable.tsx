
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { PropertyListing } from '@/types/database';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MyPropertiesTable = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin mx-auto mb-4 text-gray-500">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12A8 8 0 0 1 20 12"
                  />
                </svg>
              </div>
              <p className="text-gray-600">Loading your properties...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Failed to load your properties</p>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You haven't listed any properties yet.</p>
            <Button onClick={() => navigate('/list-property')}>
              List Your First Property
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Property Listings ({properties.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">
                  {property.title}
                </TableCell>
                <TableCell>
                  <span className="capitalize">{property.property_type}</span>
                  <span className="text-gray-500 ml-2">({property.listing_type})</span>
                </TableCell>
                <TableCell>
                  {property.price ? `₪${property.price.toLocaleString()}` : 'Price on request'}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(property.status || 'pending')}>
                    {property.status || 'pending'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {property.city}{property.neighborhood && `, ${property.neighborhood}`}
                </TableCell>
                <TableCell>
                  {new Date(property.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/property/${property.id}/photos`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(property.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
