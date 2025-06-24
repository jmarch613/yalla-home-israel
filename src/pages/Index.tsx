
import React from 'react';
import { Header } from '@/components/Header';
import { SearchHero } from '@/components/SearchHero';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { selectedLanguage } = useLanguage();

  // Apply RTL direction for Hebrew
  React.useEffect(() => {
    document.documentElement.dir = selectedLanguage === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = selectedLanguage;
  }, [selectedLanguage]);

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
