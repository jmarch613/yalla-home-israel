
import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PropertyImageSection } from '@/components/property-details/PropertyImageSection';
import { PropertyInfoSection } from '@/components/property-details/PropertyInfoSection';
import { PropertyStatsSection } from '@/components/property-details/PropertyStatsSection';
import { PropertyDescriptionSection } from '@/components/property-details/PropertyDescriptionSection';
import { usePropertyDetails } from '@/hooks/usePropertyDetails';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { data: property, isLoading, error } = usePropertyDetails(id!);

  useEffect(() => {
    // Restore scroll position when returning from property details
    if (location.state?.scrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, location.state.scrollPosition);
      }, 100);
    }
  }, [location.state]);

  // Helper function to transform text abbreviations
  const transformText = (text: string) => {
    if (!text) return '';
    return text
      .replace(/(\d+)BR/gi, (match, num) => `${num} bedroom${num > 1 ? 's' : ''}`)
      .replace(/(\d+)BA/gi, (match, num) => `${num} bathroom${num > 1 ? 's' : ''}`);
  };

  const handleBackClick = () => {
    if (location.state?.searchParams) {
      console.log('Navigating back to search with params:', location.state.searchParams);
      navigate(`/search${location.state.searchParams}`);
    } else {
      navigate(-1);
    }
  };

  // Helper function to check if property is from property_listings table
  const isUserProperty = (prop: any): boolean => {
    return 'user_id' in prop && 'listing_type' in prop;
  };

  // Helper function to get image URL based on property type
  const getImageUrl = (prop: any): string | null => {
    if (isUserProperty(prop)) {
      return prop.images && prop.images.length > 0 ? prop.images[0] : null;
    }
    return prop.image_url;
  };

  // Helper function to get price display
  const getPriceDisplay = (prop: any): string | null => {
    if (isUserProperty(prop)) {
      return prop.price ? `₪${prop.price.toLocaleString()}` : null;
    }
    return prop.price;
  };

  // Helper function to get listing URL
  const getListingUrl = (prop: any): string | null => {
    return isUserProperty(prop) ? null : prop.listing_url;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">Loading property details...</div>
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Property not found</h1>
              <p className="text-gray-600 mb-4">
                The property you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={handleBackClick}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={handleBackClick}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {location.state?.searchParams ? 'Search' : 'Previous Page'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div>
              <PropertyImageSection
                imageUrl={getImageUrl(property)}
                title={property.title}
              />
            </div>

            {/* Right Column - Property Info */}
            <div>
              <PropertyInfoSection
                title={property.title}
                address={property.address}
                price={getPriceDisplay(property)}
                propertyType={property.property_type}
                neighborhood={property.neighborhood}
                listingUrl={getListingUrl(property)}
                transformText={transformText}
              />
            </div>
          </div>

          {/* Property Stats */}
          <PropertyStatsSection
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            area={property.area}
          />

          {/* Description */}
          <PropertyDescriptionSection
            description={property.description}
            transformText={transformText}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
