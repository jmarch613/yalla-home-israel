
import React from 'react';
import { PropertyCard } from '@/components/PropertyCard';

interface PropertyGridProps {
  filters: any;
}

// Mock data for Israeli properties
const mockProperties = [
  {
    id: 1,
    title: 'Modern 3BR Apartment in Tel Aviv',
    location: 'Dizengoff, Tel Aviv',
    price: '₪2,800,000',
    type: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 90,
    image: '/placeholder.svg',
    features: ['Parking', 'Balcony', 'Elevator']
  },
  {
    id: 2,
    title: 'Luxury Penthouse with Sea View',
    location: 'Marina, Herzliya',
    price: '₪8,500/month',
    type: 'rent',
    bedrooms: 4,
    bathrooms: 3,
    area: 150,
    image: '/placeholder.svg',
    features: ['Sea View', 'Parking', 'Pool', 'Garden']
  },
  {
    id: 3,
    title: 'Charming House in Jerusalem',
    location: 'German Colony, Jerusalem',
    price: '₪4,200,000',
    type: 'sale',
    bedrooms: 4,
    bathrooms: 2,
    area: 120,
    image: '/placeholder.svg',
    features: ['Garden', 'Parking', 'Storage']
  },
  {
    id: 4,
    title: 'Modern Studio in Ramat Gan',
    location: 'Diamond District, Ramat Gan',
    price: '₪4,800/month',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    image: '/placeholder.svg',
    features: ['Furnished', 'Gym', 'Concierge']
  },
  {
    id: 5,
    title: 'Family Villa in Netanya',
    location: 'Ir Yamim, Netanya',
    price: '₪3,500,000',
    type: 'sale',
    bedrooms: 5,
    bathrooms: 3,
    area: 200,
    image: '/placeholder.svg',
    features: ['Pool', 'Garden', 'Parking', 'Sea View']
  },
  {
    id: 6,
    title: 'Renovated 2BR in Haifa',
    location: 'Carmel Center, Haifa',
    price: '₪6,200/month',
    type: 'rent',
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    image: '/placeholder.svg',
    features: ['Renovated', 'City View', 'Balcony']
  }
];

export const PropertyGrid = ({ filters }: PropertyGridProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">{mockProperties.length} properties found</p>
        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
          <option>Sort by: Most Recent</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Size: Largest First</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};
