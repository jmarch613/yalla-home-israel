
import React from 'react';
import { Header } from '@/components/Header';
import { PropertyDetailsHeader } from '@/components/property-details/PropertyDetailsHeader';

interface PropertyDetailsLayoutProps {
  children: React.ReactNode;
  onBackClick: () => void;
  backButtonText: string;
}

export const PropertyDetailsLayout = ({ children, onBackClick, backButtonText }: PropertyDetailsLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PropertyDetailsHeader 
            onBackClick={onBackClick}
            backButtonText={backButtonText}
          />
          {children}
        </div>
      </div>
    </div>
  );
};
