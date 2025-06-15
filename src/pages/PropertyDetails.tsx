import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Bed, Bath, Square, MapPin, ExternalLink, ImageOff } from 'lucide-react';

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [imageError, setImageError] = useState(false);

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      if (!id) throw new Error('Property ID is required');
      
      console.log('Fetching property with ID:', id);
      
      const { data, error } = await supabase
        .from('scraped_properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        throw error;
      }
      
      console.log('Fetched property data:', data);
      return data;
    },
    enabled: !!id,
  });

  const handleImageError = () => {
    console.log('Property detail image failed to load');
    setImageError(true);
  };

  const handleBackToSearch = () => {
    // Get the referrer from the location state or default to search page
    const searchParams = location.state?.searchParams || new URLSearchParams();
    const searchPath = `/search?${searchParams.toString()}`;
    console.log('Navigating back to search with params:', searchPath);
    navigate(searchPath);
  };

  // Helper function to transform text from abbreviations to full phrases
  const transformText = (text: string) => {
    if (!text) return text;
    return text
      .replace(/(\d+)BR/gi, (match, num) => `${num} bedroom`)
      .replace(/(\d+)BA/gi, (match, num) => `${num} bathroom${num > 1 ? 's' : ''}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading property details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
            <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Button onClick={handleBackToSearch}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToSearch}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Image */}
          <div>
            {!imageError && property.image_url ? (
              <img
                src={property.image_url}
                alt={property.title || 'Property'}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                onError={handleImageError}
                onLoad={() => console.log('Property detail image loaded successfully')}
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <ImageOff className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">Image not available</p>
                </div>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {transformText(property.title || '')}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.address}</span>
              </div>
              <div className="text-3xl font-bold text-primary">
                {property.price}
              </div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Bed className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="text-xl font-semibold">{property.bedrooms || 0}</div>
                  <div className="text-sm text-gray-600">
                    {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="text-xl font-semibold">{property.bathrooms || 0}</div>
                  <div className="text-sm text-gray-600">
                    {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Square className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="text-xl font-semibold">{property.area || 0}</div>
                  <div className="text-sm text-gray-600">m²</div>
                </CardContent>
              </Card>
            </div>

            {/* Property Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Property Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="font-medium">Type:</span> {property.property_type || 'N/A'}</div>
                <div><span className="font-medium">Neighborhood:</span> {property.neighborhood || 'N/A'}</div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1">
                Contact Agent
              </Button>
              {property.listing_url && (
                <Button variant="outline" className="flex-1" asChild>
                  <a href={property.listing_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Original
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {property.description && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  {transformText(property.description)}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
