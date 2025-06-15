
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PropertyImageSection } from '@/components/property-details/PropertyImageSection';
import { PropertyStatsSection } from '@/components/property-details/PropertyStatsSection';
import { PropertyInfoSection } from '@/components/property-details/PropertyInfoSection';
import { PropertyDescriptionSection } from '@/components/property-details/PropertyDescriptionSection';

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

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
          <PropertyImageSection 
            imageUrl={property.image_url}
            title={property.title}
          />

          {/* Property Details */}
          <div>
            <PropertyInfoSection
              title={property.title}
              address={property.address}
              price={property.price}
              propertyType={property.property_type}
              neighborhood={property.neighborhood}
              listingUrl={property.listing_url}
              transformText={transformText}
            />

            <PropertyStatsSection
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
            />
          </div>
        </div>

        {/* Description */}
        <PropertyDescriptionSection
          description={property.description}
          transformText={transformText}
        />
      </div>
    </div>
  );
}
