
import { enTranslations } from './en';
import { frTranslations } from './fr';
import { heTranslations } from './he';
import { ruTranslations } from './ru';

export type Language = 'en' | 'fr' | 'he' | 'ru';

export const translations: Record<Language, Record<string, string>> = {
  en: enTranslations,
  fr: frTranslations,
  he: heTranslations,
  ru: ruTranslations
};
