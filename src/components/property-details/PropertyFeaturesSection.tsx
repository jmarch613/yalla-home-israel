
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Wind, Thermometer, Home, TreePine, Car, Shield, ShieldCheck, CheckCircle } from 'lucide-react';
import { PropertyDetailsType } from '@/hooks/usePropertyDetails';

interface PropertyFeaturesSectionProps {
  property: PropertyDetailsType;
}

export const PropertyFeaturesSection = ({ property }: PropertyFeaturesSectionProps) => {
  // Helper function to check if property is from property_listings table
  const isUserProperty = (prop: any): boolean => {
    return 'user_id' in prop && 'listing_type' in prop;
  };

  // Helper function to get features array
  const getFeatures = (prop: any): string[] => {
    if (isUserProperty(prop)) {
      const features: string[] = [];
      if (prop.balcony) features.push('Balcony');
      if (prop.elevator) features.push('Elevator');
      if (prop.garden) features.push('Garden');
      if (prop.air_conditioning) features.push('AC');
      if (prop.heating) features.push('Heating');
      if (prop.furnished) features.push('Furnished');
      if (prop.pets_allowed) features.push('Pets Allowed');
      if (prop.safe_room) features.push('Safe Room');
      if (prop.bomb_shelter) features.push('Bomb Shelter');
      if (prop.parking_spots && prop.parking_spots > 0) {
        features.push(`${prop.parking_spots} Parking`);
      }
      return features;
    }
    // For scraped properties, create features from available data
    const features: string[] = [];
    if (prop.property_type) features.push(prop.property_type);
    if (prop.neighborhood) features.push(prop.neighborhood);
    features.push('Recently Updated');
    return features.filter(Boolean);
  };

  // Helper function to get icon for feature
  const getFeatureIcon = (feature: string) => {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes('ac') || featureLower.includes('air conditioning')) {
      return <Wind className="w-4 h-4" />;
    }
    if (featureLower.includes('heating')) {
      return <Thermometer className="w-4 h-4" />;
    }
    if (featureLower.includes('furnished')) {
      return <Home className="w-4 h-4" />;
    }
    if (featureLower.includes('garden')) {
      return <TreePine className="w-4 h-4" />;
    }
    if (featureLower.includes('parking')) {
      return <Car className="w-4 h-4" />;
    }
    if (featureLower.includes('safe room')) {
      return <Shield className="w-4 h-4" />;
    }
    if (featureLower.includes('bomb shelter')) {
      return <ShieldCheck className="w-4 h-4" />;
    }
    return <CheckCircle className="w-4 h-4" />;
  };

  const features = getFeatures(property);

  if (features.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Features & Amenities</h3>
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature) => {
              const icon = getFeatureIcon(feature);
              return (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <div className="text-primary">
                    {icon}
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
