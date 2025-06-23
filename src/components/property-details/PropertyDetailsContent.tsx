
import React from 'react';
import { PropertyPhotoViewer } from '@/components/property-details/PropertyPhotoViewer';
import { PropertyInfoSection } from '@/components/property-details/PropertyInfoSection';
import { PropertyStatsSection } from '@/components/property-details/PropertyStatsSection';
import { PropertyFeaturesSection } from '@/components/property-details/PropertyFeaturesSection';
import { PropertyDescriptionSection } from '@/components/property-details/PropertyDescriptionSection';
import { FloorplanViewer } from '@/components/property-details/FloorplanViewer';
import { PropertyDetailsType } from '@/hooks/usePropertyDetails';
import { PropertyCardType } from '@/utils/propertyFiltering';
import { useLanguage } from '@/contexts/LanguageContext';

interface PropertyDetailsContentProps {
  property: PropertyDetailsType;
  transformText: (text: string) => string;
}

export const PropertyDetailsContent = ({ property, transformText }: PropertyDetailsContentProps) => {
  const { t } = useLanguage();

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
      // For sample properties, use the image property
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

  // Helper function to get title with translation
  const getTitle = (prop: any): string => {
    const title = prop.title || t('property.type.apartment');
    return transformText(title);
  };

  // Helper function to get address with translation
  const getAddress = (prop: any): string => {
    let address = '';
    if (isSampleProperty(prop)) {
      address = prop.location;
    } else {
      address = prop.address || prop.location || '';
    }
    return transformText(address);
  };

  // Helper function to get property type with translation
  const getPropertyType = (prop: any): string | null => {
    if (isSampleProperty(prop)) {
      // Extract property type from features array
      const typeFeature = prop.features?.find((feature: string) => 
        ['apartment', 'house', 'villa', 'penthouse', 'studio'].some(type => 
          feature.toLowerCase().includes(type.toLowerCase())
        )
      );
      
      if (typeFeature) {
        const lowerType = typeFeature.toLowerCase();
        if (lowerType.includes('apartment')) return t('property.type.apartment');
        if (lowerType.includes('house')) return t('property.type.house');
        if (lowerType.includes('villa')) return t('property.type.villa');
        if (lowerType.includes('penthouse')) return t('property.type.penthouse');
        if (lowerType.includes('studio')) return t('property.type.studio');
      }
      return null;
    }
    
    const propertyType = prop.property_type;
    if (!propertyType) return null;
    
    // Translate property type
    const typeKey = `property.type.${propertyType.toLowerCase()}`;
    return t(typeKey);
  };

  // Helper function to get neighborhood with translation
  const getNeighborhood = (prop: any): string | null => {
    let neighborhood = '';
    if (isSampleProperty(prop)) {
      neighborhood = prop.neighborhood || prop.city || '';
    } else {
      neighborhood = prop.neighborhood || '';
    }
    return neighborhood ? transformText(neighborhood) : null;
  };

  // Helper function to get description with translation
  const getDescription = (prop: any): string | null => {
    if (isSampleProperty(prop)) {
      // Sample properties don't have descriptions
      return null;
    }
    const description = prop.description || null;
    return description ? transformText(description) : null;
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
        description={getDescription(property)}
        transformText={transformText}
      />
    </>
  );
};
