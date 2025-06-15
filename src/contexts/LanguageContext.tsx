
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'he' | 'fr' | 'ru' | 'ar';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.list': 'List Property',
    'nav.signin': 'Sign In',
    'nav.signout': 'Sign Out',
    
    // Search Hero
    'hero.title': 'Find Your Dream Home in Israel',
    'hero.subtitle': 'Discover the perfect property with our comprehensive search tools',
    'hero.search.placeholder': 'Enter city or neighborhood',
    'hero.button.buy': 'Buy',
    'hero.button.rent': 'Rent',
    'hero.button.search': 'Search Properties',
    
    // Property Grid
    'grid.properties': 'properties',
    'grid.filtered': 'filtered from',
    'grid.total': 'total',
    'grid.update': 'Update Data',
    'grid.sort.recent': 'Sort by: Most Recent',
    'grid.sort.price.low': 'Price: Low to High',
    'grid.sort.price.high': 'Price: High to Low',
    'grid.sort.size': 'Size: Largest First',
    
    // Property Details
    'details.back': 'Back to Search',
    'details.loading': 'Loading property details...',
    'details.notfound.title': 'Property Not Found',
    'details.notfound.message': 'The property you\'re looking for doesn\'t exist or has been removed.',
    'details.bedrooms': 'bedrooms',
    'details.bathrooms': 'bathrooms',
    'details.area': 'Area',
    
    // Common
    'common.price': 'Price',
    'common.location': 'Location',
    'common.type': 'Type',
    'common.size': 'Size',
    'common.bedrooms': 'Bedrooms',
    'common.bathrooms': 'Bathrooms'
  },
  he: {
    // Header
    'nav.home': 'בית',
    'nav.search': 'חיפוש',
    'nav.list': 'פרסום נכס',
    'nav.signin': 'התחברות',
    'nav.signout': 'התנתקות',
    
    // Search Hero
    'hero.title': 'מצא את בית החלומות שלך בישראל',
    'hero.subtitle': 'גלה את הנכס המושלם עם כלי החיפוש המתקדמים שלנו',
    'hero.search.placeholder': 'הזן עיר או שכונה',
    'hero.button.buy': 'קנייה',
    'hero.button.rent': 'השכרה',
    'hero.button.search': 'חפש נכסים',
    
    // Property Grid
    'grid.properties': 'נכסים',
    'grid.filtered': 'מסונן מתוך',
    'grid.total': 'סה"כ',
    'grid.update': 'עדכון נתונים',
    'grid.sort.recent': 'מיון: הכי חדשים',
    'grid.sort.price.low': 'מחיר: נמוך לגבוה',
    'grid.sort.price.high': 'מחיר: גבוה לנמוך',
    'grid.sort.size': 'גודל: הכי גדולים',
    
    // Property Details
    'details.back': 'חזור לחיפוש',
    'details.loading': 'טוען פרטי נכס...',
    'details.notfound.title': 'נכס לא נמצא',
    'details.notfound.message': 'הנכס שאתה מחפש לא קיים או הוסר.',
    'details.bedrooms': 'חדרי שינה',
    'details.bathrooms': 'חדרי אמבטיה',
    'details.area': 'שטח',
    
    // Common
    'common.price': 'מחיר',
    'common.location': 'מיקום',
    'common.type': 'סוג',
    'common.size': 'גודל',
    'common.bedrooms': 'חדרי שינה',
    'common.bathrooms': 'חדרי אמבטיה'
  },
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.search': 'Recherche',
    'nav.list': 'Publier un bien',
    'nav.signin': 'Se connecter',
    'nav.signout': 'Se déconnecter',
    
    // Search Hero
    'hero.title': 'Trouvez la maison de vos rêves en Israël',
    'hero.subtitle': 'Découvrez la propriété parfaite avec nos outils de recherche complets',
    'hero.search.placeholder': 'Entrez ville ou quartier',
    'hero.button.buy': 'Acheter',
    'hero.button.rent': 'Louer',
    'hero.button.search': 'Rechercher des propriétés',
    
    // Property Grid
    'grid.properties': 'propriétés',
    'grid.filtered': 'filtré de',
    'grid.total': 'total',
    'grid.update': 'Mettre à jour les données',
    'grid.sort.recent': 'Trier par: Plus récent',
    'grid.sort.price.low': 'Prix: Croissant',
    'grid.sort.price.high': 'Prix: Décroissant',
    'grid.sort.size': 'Taille: Plus grand d\'abord',
    
    // Property Details
    'details.back': 'Retour à la recherche',
    'details.loading': 'Chargement des détails de la propriété...',
    'details.notfound.title': 'Propriété introuvable',
    'details.notfound.message': 'La propriété que vous recherchez n\'existe pas ou a été supprimée.',
    'details.bedrooms': 'chambres',
    'details.bathrooms': 'salles de bain',
    'details.area': 'Surface',
    
    // Common
    'common.price': 'Prix',
    'common.location': 'Emplacement',
    'common.type': 'Type',
    'common.size': 'Taille',
    'common.bedrooms': 'Chambres',
    'common.bathrooms': 'Salles de bain'
  },
  ru: {
    // Header
    'nav.home': 'Главная',
    'nav.search': 'Поиск',
    'nav.list': 'Разместить объект',
    'nav.signin': 'Войти',
    'nav.signout': 'Выйти',
    
    // Search Hero
    'hero.title': 'Найдите дом своей мечты в Израиле',
    'hero.subtitle': 'Откройте для себя идеальную недвижимость с помощью наших инструментов поиска',
    'hero.search.placeholder': 'Введите город или район',
    'hero.button.buy': 'Купить',
    'hero.button.rent': 'Арендовать',
    'hero.button.search': 'Поиск недвижимости',
    
    // Property Grid
    'grid.properties': 'объектов',
    'grid.filtered': 'отфильтровано из',
    'grid.total': 'всего',
    'grid.update': 'Обновить данные',
    'grid.sort.recent': 'Сортировка: Новые',
    'grid.sort.price.low': 'Цена: По возрастанию',
    'grid.sort.price.high': 'Цена: По убыванию',
    'grid.sort.size': 'Размер: Сначала большие',
    
    // Property Details
    'details.back': 'Назад к поиску',
    'details.loading': 'Загрузка данных объекта...',
    'details.notfound.title': 'Объект не найден',
    'details.notfound.message': 'Объект, который вы ищете, не существует или был удален.',
    'details.bedrooms': 'спален',
    'details.bathrooms': 'ванных комнат',
    'details.area': 'Площадь',
    
    // Common
    'common.price': 'Цена',
    'common.location': 'Местоположение',
    'common.type': 'Тип',
    'common.size': 'Размер',
    'common.bedrooms': 'Спальни',
    'common.bathrooms': 'Ванные комнаты'
  },
  ar: {
    // Header
    'nav.home': 'الرئيسية',
    'nav.search': 'بحث',
    'nav.list': 'نشر عقار',
    'nav.signin': 'تسجيل الدخول',
    'nav.signout': 'تسجيل الخروج',
    
    // Search Hero
    'hero.title': 'اعثر على منزل أحلامك في إسرائيل',
    'hero.subtitle': 'اكتشف العقار المثالي مع أدوات البحث الشاملة لدينا',
    'hero.search.placeholder': 'أدخل المدينة أو الحي',
    'hero.button.buy': 'شراء',
    'hero.button.rent': 'إيجار',
    'hero.button.search': 'البحث عن العقارات',
    
    // Property Grid
    'grid.properties': 'عقارات',
    'grid.filtered': 'مرشح من',
    'grid.total': 'إجمالي',
    'grid.update': 'تحديث البيانات',
    'grid.sort.recent': 'ترتيب حسب: الأحدث',
    'grid.sort.price.low': 'السعر: من الأقل للأعلى',
    'grid.sort.price.high': 'السعر: من الأعلى للأقل',
    'grid.sort.size': 'الحجم: الأكبر أولاً',
    
    // Property Details
    'details.back': 'العودة إلى البحث',
    'details.loading': 'تحميل تفاصيل العقار...',
    'details.notfound.title': 'العقار غير موجود',
    'details.notfound.message': 'العقار الذي تبحث عنه غير موجود أو تم حذفه.',
    'details.bedrooms': 'غرف نوم',
    'details.bathrooms': 'حمامات',
    'details.area': 'المساحة',
    
    // Common
    'common.price': 'السعر',
    'common.location': 'الموقع',
    'common.type': 'النوع',
    'common.size': 'الحجم',
    'common.bedrooms': 'غرف النوم',
    'common.bathrooms': 'الحمامات'
  }
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
