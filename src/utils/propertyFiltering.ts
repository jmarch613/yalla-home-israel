
import { ScrapedProperty } from '@/types/database';

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
  city?: string; // Add city field for better filtering
  neighborhood?: string; // Add neighborhood field for better filtering
  status?: string; // Add status field for property status banners
  listing_type?: string; // Add listing_type for filtering
}

// Transforms raw scraped properties to the normalized PropertyCardType and removes duplicates
export function transformProperties(scrapedProperties: ScrapedProperty[] = []): PropertyCardType[] {
  const transformed = scrapedProperties.map((property) => ({
    id: property.id,
    title: property.title || 'Property Title',
    location: property.address || 'Jerusalem',
    price: property.price || '₪0',
    type: 'sale',
    listing_type: 'sale', // Default scraped properties to sale
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    area: property.area || 0,
    image: property.image_url || '/placeholder.svg',
    features: [
      property.property_type || 'Property',
      property.neighborhood || 'Jerusalem',
      'Recently Updated'
    ].filter(Boolean),
    created_at: property.created_at,
    city: property.neighborhood || 'Jerusalem', // Add city for filtering
    neighborhood: property.neighborhood
  }));

  // Remove duplicates based on title, address, and price
  const seen = new Set();
  const uniqueProperties = transformed.filter((property) => {
    const key = `${property.title}-${property.location}-${property.price}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });

  console.log(`Filtered ${transformed.length - uniqueProperties.length} duplicate properties`);
  return uniqueProperties;
}

export function filterProperties(properties: PropertyCardType[], filters: any): PropertyCardType[] {
  console.log('Filtering properties. Total before filter:', properties.length);
  console.log('Applied filters:', filters);
  
  const filtered = properties.filter((property) => {
    // Property type filter (Buy/Rent) - This is the key fix
    if (filters.type) {
      const searchType = filters.type.toLowerCase();
      const propertyListingType = (property.listing_type || property.type || 'sale').toLowerCase();
      
      console.log(`Checking property: ${property.title}`);
      console.log(`  - Search type: "${searchType}"`);
      console.log(`  - Property listing type: "${propertyListingType}"`);
      
      // Map 'buy' to 'sale' for consistency
      const normalizedSearchType = searchType === 'buy' ? 'sale' : searchType;
      
      if (propertyListingType !== normalizedSearchType) {
        console.log(`  - Type mismatch: skipping property`);
        return false;
      }
    }
    
    // Location filter - improved to check multiple fields and be case-insensitive
    if (filters.location) {
      const searchLocation = filters.location.toLowerCase();
      const propertyLocation = (property.location || '').toLowerCase();
      const propertyCity = (property.city || '').toLowerCase();
      const propertyFeatures = property.features.map(f => f.toLowerCase()).join(' ');
      
      console.log(`Checking property: ${property.title}`);
      console.log(`  - Property location: "${propertyLocation}"`);
      console.log(`  - Property city: "${propertyCity}"`);
      console.log(`  - Property features: "${propertyFeatures}"`);
      console.log(`  - Search location: "${searchLocation}"`);
      
      // Check if the search location matches any of: location, city, or features
      const locationMatch = 
        propertyLocation.includes(searchLocation) ||
        propertyCity.includes(searchLocation) ||
        propertyFeatures.includes(searchLocation);
      
      console.log(`  - Location match: ${locationMatch}`);
      
      if (!locationMatch) {
        return false;
      }
    }
    
    // Neighborhood filter
    if (filters.neighborhood) {
      const searchNeighborhood = filters.neighborhood.toLowerCase();
      const hasNeighborhoodMatch = property.features.some(feature =>
        feature.toLowerCase().includes(searchNeighborhood)
      );
      if (!hasNeighborhoodMatch) {
        return false;
      }
    }
    
    // Property type filter (apartment, house, etc.)
    if (filters.propertyType) {
      const hasTypeMatch = property.features.some(feature =>
        feature.toLowerCase().includes(filters.propertyType.toLowerCase())
      );
      if (!hasTypeMatch) {
        return false;
      }
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
  
  console.log('Properties after filtering:', filtered.length);
  return filtered;
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
  } else if (sort === 'price-high-low') {
    arr.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[₪,]/g, '')) || 0;
      const priceB = parseInt(b.price.replace(/[₪,]/g, '')) || 0;
      return priceB - priceA;
    });
  } else if (sort === 'size-largest') {
    arr.sort((a, b) => (b.area || 0) - (a.area || 0));
  }
  return arr;
}
