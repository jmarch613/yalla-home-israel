
import React from 'react';
import { Header } from '@/components/Header';
import { SearchHero } from '@/components/SearchHero';
import { FeaturedProperties } from '@/components/FeaturedProperties';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchHero />
      <div className="container mx-auto px-4 py-12">
        <FeaturedProperties />
      </div>
    </div>
  );
};

export default Index;
