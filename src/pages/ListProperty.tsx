
import React from 'react';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { usePropertySubmission } from '@/hooks/usePropertySubmission';
import { AuthRequiredCard } from '@/components/property-form/AuthRequiredCard';
import { PropertyForm } from '@/components/property-form/PropertyForm';

const ListProperty = () => {
  const { user } = useAuth();
  const { isSubmitting, propertyId, submitProperty } = usePropertySubmission(user?.id);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <AuthRequiredCard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">List Your Property</h1>
          
          <PropertyForm 
            onSubmit={submitProperty}
            isSubmitting={isSubmitting}
            propertyId={propertyId}
          />
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
