
import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { PropertyDetailsLayout } from '@/components/property-details/PropertyDetailsLayout';
import { PropertyDetailsContent } from '@/components/property-details/PropertyDetailsContent';
import { PropertyDetailsLoadingState } from '@/components/property-details/PropertyDetailsLoadingState';
import { PropertyDetailsErrorState } from '@/components/property-details/PropertyDetailsErrorState';
import { usePropertyDetails } from '@/hooks/usePropertyDetails';
import { handleBackNavigation, getBackButtonText } from '@/components/property-details/utils/navigationUtils';
import { useLanguage } from '@/contexts/LanguageContext';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedLanguage, t } = useLanguage();
  
  const { data: property, isLoading, error } = usePropertyDetails(id!);

  // Apply RTL direction for Hebrew
  useEffect(() => {
    document.documentElement.dir = selectedLanguage === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = selectedLanguage;
  }, [selectedLanguage]);

  useEffect(() => {
    // Restore scroll position when returning from property details
    if (location.state?.scrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, location.state.scrollPosition);
      }, 100);
    }
  }, [location.state]);

  // Helper function to transform text abbreviations
  const transformText = (text: string) => {
    if (!text) return '';
    return text
      .replace(/(\d+)BR/gi, (match, num) => `${num} ${num > 1 ? t('details.bedrooms') : t('details.bedrooms').slice(0, -1)}`)
      .replace(/(\d+)BA/gi, (match, num) => `${num} ${num > 1 ? t('details.bathrooms') : t('details.bathrooms').slice(0, -1)}`);
  };

  const handleBackClick = () => {
    handleBackNavigation(navigate, location, property);
  };

  const backButtonText = getBackButtonText(location, property);

  if (isLoading) {
    return (
      <PropertyDetailsLoadingState 
        onBackClick={handleBackClick}
        backButtonText={backButtonText}
      />
    );
  }

  if (error || !property) {
    return (
      <PropertyDetailsErrorState 
        onBackClick={handleBackClick}
        backButtonText={backButtonText}
      />
    );
  }

  return (
    <PropertyDetailsLayout onBackClick={handleBackClick} backButtonText={backButtonText}>
      <PropertyDetailsContent 
        property={property}
        transformText={transformText}
      />
    </PropertyDetailsLayout>
  );
};

export default PropertyDetails;
