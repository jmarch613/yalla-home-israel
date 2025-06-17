
import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { PropertyDetailsLayout } from '@/components/property-details/PropertyDetailsLayout';
import { PropertyDetailsContent } from '@/components/property-details/PropertyDetailsContent';
import { PropertyDetailsLoadingState } from '@/components/property-details/PropertyDetailsLoadingState';
import { PropertyDetailsErrorState } from '@/components/property-details/PropertyDetailsErrorState';
import { usePropertyDetails } from '@/hooks/usePropertyDetails';
import { handleBackNavigation, getBackButtonText } from '@/components/property-details/utils/navigationUtils';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { data: property, isLoading, error } = usePropertyDetails(id!);

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
      .replace(/(\d+)BR/gi, (match, num) => `${num} bedroom${num > 1 ? 's' : ''}`)
      .replace(/(\d+)BA/gi, (match, num) => `${num} bathroom${num > 1 ? 's' : ''}`);
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
