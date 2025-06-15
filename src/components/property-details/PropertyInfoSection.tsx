
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PropertyInfoSectionProps {
  title: string | null;
  address: string | null;
  price: string | null;
  propertyType: string | null;
  neighborhood: string | null;
  listingUrl: string | null;
  transformText: (text: string) => string;
}

export const PropertyInfoSection = ({ 
  title, 
  address, 
  price, 
  propertyType, 
  neighborhood, 
  listingUrl, 
  transformText 
}: PropertyInfoSectionProps) => {
  const { t } = useLanguage();

  // Function to translate property type from database
  const translatePropertyType = (type: string | null) => {
    if (!type) return t('common.unavailable');
    
    const typeKey = `property.type.${type.toLowerCase()}`;
    const translated = t(typeKey);
    
    // If translation doesn't exist, fallback to original type
    return translated === typeKey ? type : translated;
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {transformText(title || '')}
        </h1>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{address}</span>
        </div>
        <div className="text-3xl font-bold text-primary">
          {price}
        </div>
      </div>

      {/* Property Features */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">{t('details.type')}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="font-medium">{t('details.type')}:</span> {translatePropertyType(propertyType)}</div>
          <div><span className="font-medium">{t('details.neighborhood')}:</span> {neighborhood || t('common.unavailable')}</div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1">
          {t('details.contact')}
        </Button>
        {listingUrl && (
          <Button variant="outline" className="flex-1" asChild>
            <a href={listingUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('details.original')}
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};
