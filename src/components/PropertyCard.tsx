
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Bed, Bath, Square, MapPin, ImageOff, Wind, Thermometer, Home, TreePine, Car, Shield, ShieldCheck } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { PropertyStatusBanner } from './PropertyStatusBanner';

interface PropertyCardProps {
  property: {
    id: number | string;
    title: string;
    location: string;
    price: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
    features: string[];
    status?: string;
  };
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [imageError, setImageError] = useState(false);
  const { convertPrice } = useCurrency();
  const { t } = useLanguage();

  const handleViewDetails = () => {
    // Capture current scroll position
    const scrollPosition = window.scrollY;
    
    // Convert search parameters to string to avoid cloning issues
    const searchParamsString = location.search;
    console.log('Navigating to property details with search params:', searchParamsString);
    console.log('Current scroll position:', scrollPosition);
    
    navigate(`/property/${property.id}`, { 
      state: { 
        searchParams: searchParamsString,
        scrollPosition: scrollPosition
      } 
    });
  };

  const handleImageError = () => {
    console.log('Image failed to load for property:', property.id);
    setImageError(true);
  };

  // Helper function to format bedroom text
  const formatBedroomText = (bedrooms: number) => {
    if (bedrooms === 1) return `1 ${t('details.bedrooms').slice(0, -1)}`; // Remove 's' for singular
    return `${bedrooms} ${t('details.bedrooms')}`;
  };

  // Helper function to format bathroom text
  const formatBathroomText = (bathrooms: number) => {
    if (bathrooms === 1) return `1 ${t('details.bathrooms').slice(0, -1)}`; // Remove 's' for singular
    return `${bathrooms} ${t('details.bathrooms')}`;
  };

  // Helper function to transform title text from abbreviations to full phrases
  const transformTitle = (title: string) => {
    return title
      .replace(/(\d+)BR/gi, (match, num) => `${num} ${num > 1 ? t('details.bedrooms') : t('details.bedrooms').slice(0, -1)}`)
      .replace(/(\d+)BA/gi, (match, num) => `${num} ${num > 1 ? t('details.bathrooms') : t('details.bathrooms').slice(0, -1)}`);
  };

  // Helper function to get icon for feature
  const getFeatureIcon = (feature: string) => {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes('ac') || featureLower.includes('air conditioning')) {
      return <Wind className="w-3 h-3" />;
    }
    if (featureLower.includes('heating')) {
      return <Thermometer className="w-3 h-3" />;
    }
    if (featureLower.includes('furnished')) {
      return <Home className="w-3 h-3" />;
    }
    if (featureLower.includes('garden')) {
      return <TreePine className="w-3 h-3" />;
    }
    if (featureLower.includes('parking')) {
      return <Car className="w-3 h-3" />;
    }
    if (featureLower.includes('safe room')) {
      return <Shield className="w-3 h-3" />;
    }
    if (featureLower.includes('bomb shelter')) {
      return <ShieldCheck className="w-3 h-3" />;
    }
    return null;
  };

  // Convert price to selected currency
  const convertedPrice = convertPrice(property.price);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      <div className="relative cursor-pointer" onClick={handleViewDetails}>
        {!imageError ? (
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover"
            onError={handleImageError}
            onLoad={() => console.log('Image loaded successfully for property:', property.id)}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <ImageOff className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">{t('common.unavailable')}</p>
            </div>
          </div>
        )}
        
        {/* Status Banner */}
        {property.status && <PropertyStatusBanner status={property.status} />}
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 left-2 bg-white/90 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite functionality here
          }}
        >
          <Heart className="w-4 h-4" />
        </Button>
        <div className="absolute bottom-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
          {property.type === 'sale' ? t('nav.buy') : t('nav.rent')}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-2xl font-bold text-primary">{convertedPrice}</p>
          {property.type === 'rent' && <p className="text-sm text-gray-600">{t('common.per.month')}</p>}
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 cursor-pointer" onClick={handleViewDetails}>
          {transformTitle(property.title)}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{formatBedroomText(property.bedrooms)}</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{formatBathroomText(property.bathrooms)}</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{property.area}m²</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {property.features.map((feature) => {
            const icon = getFeatureIcon(feature);
            return (
              <span
                key={feature}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1"
              >
                {icon}
                {feature}
              </span>
            );
          })}
        </div>
        
        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          onClick={handleViewDetails}
        >
          {t('common.view.details')}
        </Button>
      </CardContent>
    </Card>
  );
};
