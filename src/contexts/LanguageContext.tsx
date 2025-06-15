
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, LanguageContextType } from './types';
import { translations } from '@/translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    // Set document direction for RTL languages
    document.dir = ['he', 'ar'].includes(language) ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Re-export the Language type for backward compatibility
export type { Language } from './types';
