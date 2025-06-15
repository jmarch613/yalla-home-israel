
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyCard } from '@/components/PropertyCard';

const featuredProperties = [
  {
    id: 1,
    title: 'Luxury Penthouse in Herzliya Marina',
    location: 'Marina, Herzliya',
    price: '₪12,000,000',
    type: 'sale',
    bedrooms: 5,
    bathrooms: 4,
    area: 280,
    image: '/placeholder.svg',
    features: ['Sea View', 'Private Pool', 'Parking', 'Storage']
  },
  {
    id: 2,
    title: 'Historic Apartment in Old Jaffa',
    location: 'Old Jaffa, Tel Aviv',
    price: '₪7,500,000',
    type: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    image: '/placeholder.svg',
    features: ['Historic Building', 'Renovated', 'Sea View']
  },
  {
    id: 3,
    title: 'Modern Villa in Caesarea',
    location: 'Caesarea',
    price: '₪18,500,000',
    type: 'sale',
    bedrooms: 6,
    bathrooms: 5,
    area: 400,
    image: '/placeholder.svg',
    features: ['Pool', 'Garden', 'Golf Course View', 'Security']
  }
];

export const FeaturedProperties = () => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};
