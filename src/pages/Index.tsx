
import React from 'react';
import { Header } from '@/components/Header';
import { SearchHero } from '@/components/SearchHero';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchHero />
    </div>
  );
};

export default Index;
