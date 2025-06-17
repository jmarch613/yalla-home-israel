
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { usePropertySubmission } from '@/hooks/usePropertySubmission';
import { usePropertyDetails } from '@/hooks/usePropertyDetails';
import { AuthRequiredCard } from '@/components/property-form/AuthRequiredCard';
import { PropertyForm } from '@/components/property-form/PropertyForm';
import { LoadingState } from '@/components/my-properties/LoadingState';
import { ErrorState } from '@/components/my-properties/ErrorState';

const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: property, isLoading, error } = usePropertyDetails(id || '');
  const { isSubmitting, updateProperty } = usePropertySubmission(user?.id, id);

  useEffect(() => {
    if (property && 'user_id' in property && property.user_id !== user?.id) {
      navigate('/my-properties');
    }
  }, [property, user?.id, navigate]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <LoadingState />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <ErrorState onRetry={() => navigate('/my-properties')} />
        </div>
      </div>
    );
  }

  // Only allow editing of PropertyListing type (not ScrapedProperty)
  if (!('user_id' in property)) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <ErrorState onRetry={() => navigate('/my-properties')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit Property</h1>
          
          <PropertyForm 
            onSubmit={updateProperty}
            isSubmitting={isSubmitting}
            propertyId={id || null}
            initialData={property}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProperty;
