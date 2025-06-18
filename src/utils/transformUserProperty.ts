
import { PropertyListing } from '@/types/database';
import { PropertyCardType } from '@/utils/propertyFiltering';

export const transformUserPropertyToCardType = (property: PropertyListing): PropertyCardType => {
  // Get the first image or use a placeholder
  const image = property.images && property.images.length > 0 
    ? property.images[0] 
    : '/placeholder.svg';

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

  return {
    id: property.id,
    title: property.title,
    location: `${property.neighborhood ? property.neighborhood + ', ' : ''}${property.city}`,
    price: property.price ? `₪${property.price.toLocaleString()}` : 'Price on request',
    type: property.listing_type,
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    area: property.area || 0,
    image,
    features,
    status: property.status,
    created_at: property.created_at,
  };
};
