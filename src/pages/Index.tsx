
import React from 'react';
import { Header } from '@/components/Header';
import { SearchHero } from '@/components/SearchHero';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CurrencySelector } from '@/components/CurrencySelector';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Language and currency selectors at top right, matching search page */}
      <div className="container mx-auto px-4 mt-2 flex justify-end gap-2">
        <LanguageSelector />
        <CurrencySelector />
      </div>
      <SearchHero />
      <div className="container mx-auto px-4 py-12">
        <FeaturedProperties />
      </div>
    </div>
  );
};

export default Index;

