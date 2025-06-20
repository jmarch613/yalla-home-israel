
import { PropertyListing } from '@/types/database';
import { PropertyCardType } from '@/utils/propertyFiltering';

// Array of different images to rotate through for variety
const imagePool = [
  'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop'
];

export const transformUserPropertyToCardType = (property: PropertyListing): PropertyCardType => {
  console.log('Transforming user property:', property.title, 'ID:', property.id);
  
  // Get a consistent but varied image based on property ID
  let image = '/placeholder.svg';
  if (property.images && property.images.length > 0) {
    image = property.images[0];
  } else {
    // Use property ID to get a consistent image from the pool
    const imageIndex = parseInt(property.id.slice(-1), 16) % imagePool.length;
    image = imagePool[imageIndex];
  }

  // Create features array from boolean fields - include ALL possible features
  const features: string[] = [];
  if (property.balcony) features.push('Balcony');
  if (property.elevator) features.push('Elevator');
  if (property.garden) features.push('Garden');
  if (property.air_conditioning) features.push('AC');
  if (property.heating) features.push('Heating');
  if (property.furnished) features.push('Furnished');
  if (property.pets_allowed) features.push('Pets Allowed');
  if (property.safe_room) features.push('Safe Room');
  if (property.bomb_shelter) features.push('Bomb Shelter');
  if (property.parking_spots && property.parking_spots > 0) {
    features.push(`${property.parking_spots} Parking`);
  }

  const transformed = {
    id: property.id,
    title: property.title,
    location: `${property.neighborhood ? property.neighborhood + ', ' : ''}${property.city}`,
    price: property.price ? `₪${property.price.toLocaleString()}` : 'Price on request',
    type: property.listing_type,
    listing_type: property.listing_type, // Add listing_type for filtering
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    area: property.area || 0,
    image,
    features,
    status: property.status,
    created_at: property.created_at,
  };

  console.log('Transformed property result:', transformed);
  return transformed;
};
