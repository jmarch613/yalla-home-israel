
export type Language = 'en' | 'he' | 'fr' | 'ru' | 'ar';

export interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export type TranslationRecord = Record<string, string>;
export type TranslationsMap = Record<Language, TranslationRecord>;
