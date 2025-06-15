
import React, { createContext, useContext, ReactNode } from 'react';

// Simplified context that always returns English text
const LanguageContext = createContext<{ t: (key: string) => string } | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Simple function that returns the key as-is (fallback to English)
  const t = (key: string): string => {
    // Map common keys to English text
    const englishTexts: Record<string, string> = {
      'nav.home': 'Home',
      'nav.search': 'Search',
      'nav.list': 'List Property',
      'nav.signin': 'Sign In',
      'nav.signout': 'Sign Out',
      'hero.title': 'Find Your Dream Home in Israel',
      'hero.subtitle': 'Discover the perfect property with our comprehensive search tools',
      'hero.search.placeholder': 'Enter city or neighborhood',
      'hero.button.buy': 'Buy',
      'hero.button.rent': 'Rent',
      'hero.button.search': 'Search Properties',
      'filters.property.type': 'Property type',
      'filters.property.any': 'Any',
      'filters.property.apartment': 'Apartment',
      'filters.property.house': 'House',
      'filters.property.villa': 'Villa',
      'filters.property.penthouse': 'Penthouse',
      'filters.property.studio': 'Studio',
      'filters.bedrooms': 'Beds',
      'filters.bathrooms': 'Baths',
      'filters.neighborhood': 'Neighborhood',
      'filters.search': 'Search',
      'filters.clear': 'Clear all filters',
      'filters.parking': 'Parking',
      'filters.balcony': 'Balcony',
      'filters.elevator': 'Elevator',
      'filters.garden': 'Garden',
      'filters.safe.room': 'Safe Room',
      'filters.bomb.shelter': 'Bomb Shelter',
      'details.back': 'Back to Search',
      'details.contact': 'Contact Agent',
      'details.original': 'View Original',
      'details.type': 'Type',
      'details.neighborhood': 'Neighborhood',
      'details.description': 'Description',
      'details.bedrooms': 'bedrooms',
      'details.bathrooms': 'bathrooms',
      'details.area': 'Area',
      'search.results.for.sale': 'Property for sale in',
      'search.results.to.rent': 'Property to rent in',
      'search.results.subtitle': 'Search properties to find your perfect home',
      'property.type.apartment': 'Apartment',
      'property.type.house': 'House',
      'property.type.villa': 'Villa',
      'property.type.penthouse': 'Penthouse',
      'property.type.studio': 'Studio',
      'property.type.duplex': 'Duplex',
      'property.type.cottage': 'Cottage',
      'property.type.townhouse': 'Townhouse',
      'common.unavailable': 'N/A'
    };

    return englishTexts[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  );
};
