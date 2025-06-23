
import React from 'react';
import { PropertyPhotoViewer } from '@/components/property-details/PropertyPhotoViewer';
import { PropertyInfoSection } from '@/components/property-details/PropertyInfoSection';
import { PropertyStatsSection } from '@/components/property-details/PropertyStatsSection';
import { PropertyFeaturesSection } from '@/components/property-details/PropertyFeaturesSection';
import { PropertyDescriptionSection } from '@/components/property-details/PropertyDescriptionSection';
import { FloorplanViewer } from '@/components/property-details/FloorplanViewer';
import { PropertyDetailsType } from '@/hooks/usePropertyDetails';
import { PropertyCardType } from '@/utils/propertyFiltering';

interface PropertyDetailsContentProps {
  property: PropertyDetailsType;
  transformText: (text: string) => string;
}

export const PropertyDetailsContent = ({ property, transformText }: PropertyDetailsContentProps) => {
  // Helper function to check if property is a sample property
  const isSampleProperty = (prop: any): prop is PropertyCardType => {
    return typeof prop.id === 'string' && prop.id.startsWith('sample-');
  };

  // Helper function to check if property is from property_listings table
  const isUserProperty = (prop: any): boolean => {
    return 'user_id' in prop && 'listing_type' in prop && !isSampleProperty(prop);
  };

  // Helper function to get images array based on property type
  const getImages = (prop: any): string[] => {
    if (isSampleProperty(prop)) {
      return prop.image ? [prop.image] : [];
    }
    if (isUserProperty(prop)) {
      return prop.images && Array.isArray(prop.images) ? prop.images : [];
    }
    return prop.image_url ? [prop.image_url] : [];
  };

  // Helper function to get price display
  const getPriceDisplay = (prop: any): string | null => {
    if (isSampleProperty(prop)) {
      return prop.price;
    }
    if (isUserProperty(prop)) {
      return prop.price ? `₪${prop.price.toLocaleString()}` : null;
    }
    return prop.price;
  };

  // Helper function to get listing URL
  const getListingUrl = (prop: any): string | null => {
    if (isSampleProperty(prop) || isUserProperty(prop)) {
      return null;
    }
    return prop.listing_url;
  };

  // Helper function to get floorplan URL
  const getFloorplanUrl = (prop: any): string | null => {
    return isUserProperty(prop) ? prop.floorplan_url || null : null;
  };

  // Helper function to get title
  const getTitle = (prop: any): string => {
    return prop.title || 'Property';
  };

  // Helper function to get address
  const getAddress = (prop: any): string => {
    if (isSampleProperty(prop)) {
      return prop.location;
    }
    return prop.address || prop.location || '';
  };

  // Helper function to get property type
  const getPropertyType = (prop: any): string | null => {
    if (isSampleProperty(prop)) {
      // Extract property type from features array
      const typeFeature = prop.features?.find((feature: string) => 
        ['apartment', 'house', 'villa', 'penthouse', 'studio'].some(type => 
          feature.toLowerCase().includes(type.toLowerCase())
        )
      );
      return typeFeature || null;
    }
    return prop.property_type;
  };

  // Helper function to get neighborhood
  const getNeighborhood = (prop: any): string | null => {
    if (isSampleProperty(prop)) {
      return prop.neighborhood || prop.city || null;
    }
    return prop.neighborhood;
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div>
          <PropertyPhotoViewer
            images={getImages(property)}
            title={getTitle(property)}
          />
        </div>

        {/* Right Column - Property Info */}
        <div className="space-y-4">
          <PropertyInfoSection
            title={getTitle(property)}
            address={getAddress(property)}
            price={getPriceDisplay(property)}
            propertyType={getPropertyType(property)}
            neighborhood={getNeighborhood(property)}
            listingUrl={getListingUrl(property)}
            transformText={transformText}
          />
          
          {/* Floorplan Button */}
          {getFloorplanUrl(property) && (
            <FloorplanViewer
              floorplanUrl={getFloorplanUrl(property)!}
              title={getTitle(property)}
            />
          )}
        </div>
      </div>

      {/* Property Stats */}
      <PropertyStatsSection
        bedrooms={property.bedrooms}
        bathrooms={property.bathrooms}
        area={property.area}
      />

      {/* Features & Amenities */}
      <PropertyFeaturesSection property={property} />

      {/* Description */}
      <PropertyDescriptionSection
        description={property.description || null}
        transformText={transformText}
      />
    </>
  );
};
