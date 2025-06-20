
import React from 'react';
import { PropertyPhotoViewer } from '@/components/property-details/PropertyPhotoViewer';
import { PropertyInfoSection } from '@/components/property-details/PropertyInfoSection';
import { PropertyStatsSection } from '@/components/property-details/PropertyStatsSection';
import { PropertyFeaturesSection } from '@/components/property-details/PropertyFeaturesSection';
import { PropertyDescriptionSection } from '@/components/property-details/PropertyDescriptionSection';
import { FloorplanViewer } from '@/components/property-details/FloorplanViewer';
import { PropertyDetailsType } from '@/hooks/usePropertyDetails';

interface PropertyDetailsContentProps {
  property: PropertyDetailsType;
  transformText: (text: string) => string;
}

export const PropertyDetailsContent = ({ property, transformText }: PropertyDetailsContentProps) => {
  // Helper function to check if property is from property_listings table
  const isUserProperty = (prop: any): boolean => {
    return 'user_id' in prop && 'listing_type' in prop;
  };

  // Helper function to get images array based on property type
  const getImages = (prop: any): string[] => {
    if (isUserProperty(prop)) {
      return prop.images && Array.isArray(prop.images) ? prop.images : [];
    }
    return prop.image_url ? [prop.image_url] : [];
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

  // Helper function to get floorplan URL
  const getFloorplanUrl = (prop: any): string | null => {
    return isUserProperty(prop) ? prop.floorplan_url || null : null;
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div>
          <PropertyPhotoViewer
            images={getImages(property)}
            title={property.title || 'Property'}
          />
        </div>

        {/* Right Column - Property Info */}
        <div className="space-y-4">
          <PropertyInfoSection
            title={property.title}
            address={property.address}
            price={getPriceDisplay(property)}
            propertyType={property.property_type}
            neighborhood={property.neighborhood}
            listingUrl={getListingUrl(property)}
            transformText={transformText}
          />
          
          {/* Floorplan Button */}
          {getFloorplanUrl(property) && (
            <FloorplanViewer
              floorplanUrl={getFloorplanUrl(property)!}
              title={property.title || 'Property'}
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
        description={property.description}
        transformText={transformText}
      />
    </>
  );
};
