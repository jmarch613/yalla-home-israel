
import React from 'react';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { AuthRequiredCard } from '@/components/property-form/AuthRequiredCard';
import { MyPropertiesTable } from '@/components/my-properties/MyPropertiesTable';

const MyProperties = () => {
  const { user } = useAuth();

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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Properties</h1>
          <MyPropertiesTable />
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
