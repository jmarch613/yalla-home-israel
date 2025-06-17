
import React from 'react';
import { PropertyDetailsLayout } from '@/components/property-details/PropertyDetailsLayout';

interface PropertyDetailsLoadingStateProps {
  onBackClick: () => void;
  backButtonText: string;
}

export const PropertyDetailsLoadingState = ({ onBackClick, backButtonText }: PropertyDetailsLoadingStateProps) => {
  return (
    <PropertyDetailsLayout onBackClick={onBackClick} backButtonText={backButtonText}>
      <div className="text-center">Loading property details...</div>
    </PropertyDetailsLayout>
  );
};
