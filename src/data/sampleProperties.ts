
import { israeliLocations } from './israeliLocations';
import type { PropertyCardType } from '@/utils/propertyFiltering';

const propertyTypes = ['apartment', 'house', 'villa', 'penthouse', 'studio'];
const listingTypes = ['sale', 'rent'];

// Sample property features for variety
const featureOptions = [
  ['Renovated', 'Elevator', 'Parking'],
  ['Balcony', 'Air Conditioning', 'Storage'],
  ['Garden', 'Swimming Pool', 'Security'],
  ['Modern Kitchen', 'Hardwood Floors', 'City View'],
  ['Furnished', 'Pet Friendly', 'Near Metro'],
  ['High Ceiling', 'Natural Light', 'Quiet Street'],
  ['Terrace', 'Central Location', 'Shopping Nearby'],
  ['New Building', 'Luxury Finishes', 'Gym Access']
];

// Generate realistic prices based on city tier
const getCityPriceRange = (city: string): { min: number; max: number } => {
  const tier1Cities = ['Tel Aviv', 'Jerusalem', 'Herzliya', 'Ramat Gan'];
  const tier2Cities = ['Haifa', 'Netanya', 'Ashdod', 'Beer Sheva', 'Petah Tikva'];
  
  if (tier1Cities.includes(city)) {
    return { min: 2000000, max: 8000000 }; // High-end prices
  } else if (tier2Cities.includes(city)) {
    return { min: 1200000, max: 4000000 }; // Mid-range prices
  } else {
    return { min: 800000, max: 2500000 }; // Lower-tier prices
  }
};

// Generate realistic rent prices
const getRentPrice = (salePrice: number): number => {
  return Math.floor(salePrice * 0.0045); // Rough rental yield calculation
};

export const generateSampleProperties = (): PropertyCardType[] => {
  const properties: PropertyCardType[] = [];
  
  israeliLocations.forEach((city, index) => {
    const priceRange = getCityPriceRange(city);
    
    // Generate 2-4 properties per city
    const propertiesPerCity = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < propertiesPerCity; i++) {
      const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
      const listingType = listingTypes[Math.floor(Math.random() * listingTypes.length)];
      const bedrooms = Math.floor(Math.random() * 5) + 1;
      const bathrooms = Math.floor(Math.random() * 3) + 1;
      const area = Math.floor(Math.random() * 150) + 50;
      
      const salePrice = Math.floor(Math.random() * (priceRange.max - priceRange.min)) + priceRange.min;
      const rentPrice = getRentPrice(salePrice);
      const price = listingType === 'sale' ? salePrice : rentPrice;
      
      const features = featureOptions[Math.floor(Math.random() * featureOptions.length)];
      const randomFeatures = [...features, propertyType.charAt(0).toUpperCase() + propertyType.slice(1)];
      
      // Create variety in property titles
      const titleVariations = [
        `Beautiful ${bedrooms}-bedroom ${propertyType}`,
        `Modern ${propertyType} in ${city}`,
        `Spacious ${propertyType} with ${features[0].toLowerCase()}`,
        `Luxury ${propertyType} for ${listingType}`,
        `Charming ${propertyType} in prime location`
      ];
      
      const title = titleVariations[Math.floor(Math.random() * titleVariations.length)];
      
      // Generate realistic addresses
      const streetNumbers = ['12', '45', '78', '23', '67', '89', '34', '56'];
      const streetNames = ['HaShalom', 'Ben Gurion', 'Rothschild', 'Dizengoff', 'King George', 'Weizmann', 'HaYarkon', 'Allenby'];
      const streetNumber = streetNumbers[Math.floor(Math.random() * streetNumbers.length)];
      const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
      
      const property: PropertyCardType = {
        id: `sample-${city.toLowerCase().replace(/\s+/g, '-')}-${i}`,
        title,
        location: `${streetNumber} ${streetName} St, ${city}`,
        price: `₪${price.toLocaleString()}`,
        type: listingType,
        listing_type: listingType,
        bedrooms,
        bathrooms,
        area,
        image: `/placeholder.svg`,
        features: randomFeatures,
        created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
        city,
        neighborhood: city,
        status: 'published'
      };
      
      properties.push(property);
    }
  });
  
  return properties;
};

// Pre-generate the sample properties
export const sampleProperties = generateSampleProperties();
