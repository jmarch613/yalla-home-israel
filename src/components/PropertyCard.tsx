
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Bed, Bath, Square, MapPin, ImageOff } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

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
  };
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [imageError, setImageError] = useState(false);
  const { convertPrice } = useCurrency();

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
    if (bedrooms === 1) return '1 bedroom';
    return `${bedrooms} bedrooms`;
  };

  // Helper function to format bathroom text
  const formatBathroomText = (bathrooms: number) => {
    if (bathrooms === 1) return '1 bathroom';
    return `${bathrooms} bathrooms`;
  };

  // Helper function to transform title text from abbreviations to full phrases
  const transformTitle = (title: string) => {
    return title
      .replace(/(\d+)BR/gi, (match, num) => `${num} bedroom`)
      .replace(/(\d+)BA/gi, (match, num) => `${num} bathroom${num > 1 ? 's' : ''}`);
  };

  // Convert price to selected currency
  const convertedPrice = convertPrice(property.price);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite functionality here
          }}
        >
          <Heart className="w-4 h-4" />
        </Button>
        <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
          {property.type === 'sale' ? 'For Sale' : 'For Rent'}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-2xl font-bold text-primary">{convertedPrice}</p>
          {property.type === 'rent' && <p className="text-sm text-gray-600">per month</p>}
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
          {property.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
