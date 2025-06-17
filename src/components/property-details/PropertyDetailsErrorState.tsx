
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PropertyDetailsLayout } from '@/components/property-details/PropertyDetailsLayout';

interface PropertyDetailsErrorStateProps {
  onBackClick: () => void;
  backButtonText: string;
}

export const PropertyDetailsErrorState = ({ onBackClick, backButtonText }: PropertyDetailsErrorStateProps) => {
  return (
    <PropertyDetailsLayout onBackClick={onBackClick} backButtonText={backButtonText}>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Property not found</h1>
        <p className="text-gray-600 mb-4">
          The property you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={onBackClick}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    </PropertyDetailsLayout>
  );
};
