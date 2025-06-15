
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: number;
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
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
        <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
          {property.type === 'sale' ? 'For Sale' : 'For Rent'}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-2xl font-bold text-primary">{property.price}</p>
          {property.type === 'rent' && <p className="text-sm text-gray-600">per month</p>}
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{property.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms} bath</span>
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
        
        <Button className="w-full bg-primary hover:bg-primary/90">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
