
import { ScrapedProperty } from '@/hooks/useScrapedProperties';

export interface PropertyCardType {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  features: string[];
  created_at: string;
}

// Transforms raw scraped properties to the normalized PropertyCardType
export function transformProperties(scrapedProperties: ScrapedProperty[] = []): PropertyCardType[] {
  return scrapedProperties.map((property) => ({
    id: property.id,
    title: property.title || 'Property Title',
    location: property.address || 'Jerusalem',
    price: property.price || '₪0',
    type: 'sale',
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    area: property.area || 0,
    image: property.image_url || '/placeholder.svg',
    features: [
      property.property_type || 'Property',
      property.neighborhood || 'Jerusalem',
      'Recently Updated'
    ].filter(Boolean),
    created_at: property.created_at
  }));
}

export function filterProperties(properties: PropertyCardType[], filters: any): PropertyCardType[] {
  return properties.filter((property) => {
    // Location filter
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    // Neighborhood filter
    if (filters.neighborhood && !property.features.some(feature =>
      feature.toLowerCase().includes(filters.neighborhood.toLowerCase())
    )) {
      return false;
    }
    // Property type filter
    if (filters.propertyType && !property.features.some(feature =>
      feature.toLowerCase().includes(filters.propertyType.toLowerCase())
    )) {
      return false;
    }
    // Bedrooms filter
    if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) {
      return false;
    }
    // Bathrooms filter
    if (filters.bathrooms && property.bathrooms < parseInt(filters.bathrooms)) {
      return false;
    }
    // Price range filters
    if (filters.minPrice || filters.maxPrice) {
      const priceString = property.price.replace(/[₪,]/g, '');
      const price = parseInt(priceString);
      if (filters.minPrice && price < parseInt(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && price > parseInt(filters.maxPrice)) {
        return false;
      }
    }
    // Feature filters (simulate, as before)
    if (filters.features) {
      const hasActiveFeatureFilters = Object.values(filters.features).some(Boolean);
      if (hasActiveFeatureFilters) {
        // For demo: don't filter, but in real case would check property features
      }
    }
    return true;
  });
}

export function sortProperties(properties: PropertyCardType[], sort: string): PropertyCardType[] {
  const arr = [...properties];
  if (sort === 'most-recent') {
    arr.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } else if (sort === 'price-low-high') {
    arr.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[₪,]/g, '')) || 0;
      const priceB = parseInt(b.price.replace(/[₪,]/g, '')) || 0;
      return priceA - priceB;
    });
  }
  return arr;
}
