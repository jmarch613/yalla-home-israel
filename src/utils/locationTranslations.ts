
import { useLanguage } from '@/contexts/LanguageContext';

export const useLocationTranslation = () => {
  const { t } = useLanguage();

  const translateCity = (cityName: string): string => {
    if (!cityName) return '';
    
    // Convert city name to translation key format
    const cityKey = `city.${cityName.toLowerCase().replace(/\s+/g, '.').replace(/'/g, '')}`;
    const translation = t(cityKey);
    
    // Return translation if it exists and is different from the key, otherwise return original
    return translation !== cityKey ? translation : cityName;
  };

  const translateLocation = (city: string, neighborhood?: string): string => {
    const translatedCity = translateCity(city);
    
    if (neighborhood) {
      return `${neighborhood}, ${translatedCity}`;
    }
    
    return translatedCity;
  };

  return { translateCity, translateLocation };
};
