
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
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
  const { convertPrice } = useCurrency();
  const { t } = useLanguage();

  // Function to format property type
  const formatPropertyType = (type: string | null) => {
    if (!type) return t('common.unavailable');
    
    // Capitalize first letter
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Function to sanitize address - remove specific numbers and details
  const sanitizeAddress = (fullAddress: string | null) => {
    if (!fullAddress) return 'Address not available';
    
    let sanitized = fullAddress;
    
    // Remove patterns like "123", "Apt 4", "Building A", "Entrance 2", etc.
    sanitized = sanitized
      // Remove standalone numbers (likely house/building numbers)
      .replace(/\b\d+[a-zA-Z]?\b/g, '')
      // Remove apartment/flat references
      .replace(/\b(apt|apartment|flat|unit)\s*\d+[a-zA-Z]?/gi, '')
      // Remove building references
      .replace(/\b(building|bldg)\s*[a-zA-Z0-9]+/gi, '')
      // Remove entrance references
      .replace(/\b(entrance|entry)\s*[a-zA-Z0-9]+/gi, '')
      // Remove floor references
      .replace(/\b(floor|fl)\s*\d+/gi, '')
      // Clean up multiple spaces and commas
      .replace(/\s+/g, ' ')
      .replace(/,\s*,/g, ',')
      .replace(/^\s*,\s*/, '')
      .replace(/\s*,\s*$/, '')
      .trim();
    
    return sanitized || 'General area';
  };

  // Function to handle map click - opens Google Maps with the address
  const handleMapClick = () => {
    if (!address) return;
    
    // Use the full address for map search but could be the sanitized one for privacy
    const searchAddress = encodeURIComponent(address);
    const mapUrl = `https://www.google.com/maps/search/${searchAddress}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  // Convert price to selected currency
  const convertedPrice = price ? convertPrice(price) : t('common.unavailable');

  const sanitizedAddress = sanitizeAddress(address);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {transformText(title || '')}
        </h1>
        <div 
          className="flex items-center text-gray-600 mb-4 cursor-pointer hover:text-blue-600 transition-colors group"
          onClick={handleMapClick}
          title="Click to view on map"
        >
          <MapPin className="w-5 h-5 mr-2 group-hover:text-blue-600" />
          <span className="group-hover:underline">{sanitizedAddress}</span>
        </div>
        <div className="text-3xl font-bold text-primary">
          {convertedPrice}
        </div>
      </div>

      {/* Property Features */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">{t('details.type')}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="font-medium">{t('details.type')}:</span> {formatPropertyType(propertyType)}</div>
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
