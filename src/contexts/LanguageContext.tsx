
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

// Translation dictionary with comprehensive coverage
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header Navigation
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
    'grid.empty.title': 'No properties found',
    'grid.empty.message': 'Try adjusting your search filters to see more results.',
    'grid.empty.clear': 'Clear all filters',
    'grid.loading': 'Loading properties...',
    
    // Property Details
    'details.back': 'Back to Search',
    'details.loading': 'Loading property details...',
    'details.notfound.title': 'Property Not Found',
    'details.notfound.message': 'The property you\'re looking for doesn\'t exist or has been removed.',
    'details.bedrooms': 'bedrooms',
    'details.bathrooms': 'bathrooms',
    'details.area': 'Area',
    'details.contact': 'Contact Agent',
    'details.original': 'View Original',
    'details.type': 'Type',
    'details.neighborhood': 'Neighborhood',
    'details.description': 'Description',
    
    // Search Filters
    'filters.property.type': 'Property type',
    'filters.property.any': 'Any',
    'filters.property.apartment': 'Apartment',
    'filters.property.house': 'House',
    'filters.property.villa': 'Villa',
    'filters.property.penthouse': 'Penthouse',
    'filters.property.studio': 'Studio',
    'filters.price.min': 'Min price',
    'filters.price.max': 'Max price',
    'filters.price.no.min': 'No min',
    'filters.price.no.max': 'No max',
    'filters.bedrooms': 'Beds',
    'filters.bathrooms': 'Baths',
    'filters.neighborhood': 'Neighborhood',
    'filters.search': 'Search',
    'filters.clear': 'Clear all filters',
    'filters.more': 'More filters',
    'filters.apply': 'Apply filters',
    'filters.features': 'Property features',
    'filters.parking': 'Parking',
    'filters.balcony': 'Balcony',
    'filters.elevator': 'Elevator',
    'filters.garden': 'Garden',
    'filters.safe.room': 'Safe Room',
    'filters.bomb.shelter': 'Bomb Shelter',
    'filters.air.conditioning': 'Air Conditioning',
    'filters.heating': 'Heating',
    'filters.furnished': 'Furnished',
    'filters.pets.allowed': 'Pets Allowed',
    
    // Search Results Header
    'search.results.for.sale': 'Property for sale in',
    'search.results.to.rent': 'Property to rent in',
    'search.results.subtitle': 'Search properties to find your perfect home',
    
    // Property Types for Database Content
    'property.type.apartment': 'Apartment',
    'property.type.house': 'House',
    'property.type.villa': 'Villa',
    'property.type.penthouse': 'Penthouse',
    'property.type.studio': 'Studio',
    'property.type.duplex': 'Duplex',
    'property.type.cottage': 'Cottage',
    'property.type.townhouse': 'Townhouse',
    
    // Common Property Info
    'common.price': 'Price',
    'common.location': 'Location',
    'common.type': 'Type',
    'common.size': 'Size',
    'common.bedrooms': 'Bedrooms',
    'common.bathrooms': 'Bathrooms',
    'common.floor': 'Floor',
    'common.year.built': 'Year Built',
    'common.parking': 'Parking',
    'common.contact': 'Contact',
    'common.phone': 'Phone',
    'common.email': 'Email',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.try.again': 'Try again',
    'common.unavailable': 'N/A',
    
    // Featured Properties
    'featured.title': 'Featured Properties',
    'featured.subtitle': 'Discover our hand-picked selection of premium properties',
    
    // Form Labels
    'form.title': 'Title',
    'form.description': 'Description',
    'form.address': 'Address',
    'form.city': 'City',
    'form.neighborhood': 'Neighborhood',
    'form.price': 'Price',
    'form.bedrooms': 'Bedrooms',
    'form.bathrooms': 'Bathrooms',
    'form.area': 'Area',
    'form.floor': 'Floor',
    'form.total.floors': 'Total Floors',
    'form.year.built': 'Year Built',
    'form.parking.spots': 'Parking Spots',
    'form.contact.name': 'Contact Name',
    'form.contact.phone': 'Contact Phone',
    'form.contact.email': 'Contact Email',
    'form.submit': 'Submit',
    'form.cancel': 'Cancel',
    'form.save': 'Save',
    
    // Page Titles
    'page.home': 'Home - Real Estate Israel',
    'page.search': 'Search Properties',
    'page.list.property': 'List Your Property',
    'page.property.details': 'Property Details',
    
    // Status Messages
    'status.pending': 'Pending',
    'status.approved': 'Approved',
    'status.rejected': 'Rejected',
    'status.sold': 'Sold',
    'status.rented': 'Rented',
    'status.available': 'Available',
    
    // Units and Measurements
    'unit.sqm': 'sq m',
    'unit.room': 'room',
    'unit.rooms': 'rooms',
    'unit.floor.short': 'fl',
    'unit.year': 'year'
  },
  he: {
    // Header Navigation
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
    'grid.empty.title': 'לא נמצאו נכסים',
    'grid.empty.message': 'נסה לשנות את מסנני החיפוש כדי לראות תוצאות נוספות.',
    'grid.empty.clear': 'נקה את כל המסננים',
    'grid.loading': 'טוען נכסים...',
    
    // Property Details
    'details.back': 'חזור לחיפוש',
    'details.loading': 'טוען פרטי נכס...',
    'details.notfound.title': 'נכס לא נמצא',
    'details.notfound.message': 'הנכס שאתה מחפש לא קיים או הוסר.',
    'details.bedrooms': 'חדרי שינה',
    'details.bathrooms': 'חדרי אמבטיה',
    'details.area': 'שטח',
    'details.contact': 'צור קשר עם הסוכן',
    'details.original': 'צפה במקור',
    'details.type': 'סוג',
    'details.neighborhood': 'שכונה',
    'details.description': 'תיאור',
    
    // Search Filters
    'filters.property.type': 'סוג נכס',
    'filters.property.any': 'הכל',
    'filters.property.apartment': 'דירה',
    'filters.property.house': 'בית',
    'filters.property.villa': 'וילה',
    'filters.property.penthouse': 'פנטהאוז',
    'filters.property.studio': 'סטודיו',
    'filters.price.min': 'מחיר מינימום',
    'filters.price.max': 'מחיר מקסימום',
    'filters.price.no.min': 'אין מינימום',
    'filters.price.no.max': 'אין מקסימום',
    'filters.bedrooms': 'חדרי שינה',
    'filters.bathrooms': 'חדרי אמבטיה',
    'filters.neighborhood': 'שכונה',
    'filters.search': 'חפש',
    'filters.clear': 'נקה את כל המסננים',
    'filters.more': 'מסננים נוספים',
    'filters.apply': 'החל מסננים',
    'filters.features': 'תכונות הנכס',
    'filters.parking': 'חניה',
    'filters.balcony': 'מרפסת',
    'filters.elevator': 'מעלית',
    'filters.garden': 'גן',
    'filters.safe.room': 'חדר מוגן',
    'filters.bomb.shelter': 'מקלט',
    'filters.air.conditioning': 'מיזוג אוויר',
    'filters.heating': 'חימום',
    'filters.furnished': 'מרוהט',
    'filters.pets.allowed': 'מותר עם חיות מחמד',
    
    // Search Results Header
    'search.results.for.sale': 'נכסים למכירה ב',
    'search.results.to.rent': 'נכסים להשכרה ב',
    'search.results.subtitle': 'חפש נכסים כדי למצוא את הבית המושלם שלך',
    
    // Property Types for Database Content
    'property.type.apartment': 'דירה',
    'property.type.house': 'בית',
    'property.type.villa': 'וילה',
    'property.type.penthouse': 'פנטהאוז',
    'property.type.studio': 'סטודיו',
    'property.type.duplex': 'דופלקס',
    'property.type.cottage': 'קוטג\'',
    'property.type.townhouse': 'בית עירוני',
    
    // Common Property Info
    'common.price': 'מחיר',
    'common.location': 'מיקום',
    'common.type': 'סוג',
    'common.size': 'גודל',
    'common.bedrooms': 'חדרי שינה',
    'common.bathrooms': 'חדרי אמבטיה',
    'common.floor': 'קומה',
    'common.year.built': 'שנת בנייה',
    'common.parking': 'חניה',
    'common.contact': 'צור קשר',
    'common.phone': 'טלפון',
    'common.email': 'אימייל',
    'common.loading': 'טוען...',
    'common.error': 'שגיאה',
    'common.try.again': 'נסה שוב',
    'common.unavailable': 'לא זמין',
    
    // Featured Properties
    'featured.title': 'נכסים מובחרים',
    'featured.subtitle': 'גלה את הבחירה שלנו מנכסים איכותיים',
    
    // Form Labels
    'form.title': 'כותרת',
    'form.description': 'תיאור',
    'form.address': 'כתובת',
    'form.city': 'עיר',
    'form.neighborhood': 'שכונה',
    'form.price': 'מחיר',
    'form.bedrooms': 'חדרי שינה',
    'form.bathrooms': 'חדרי אמבטיה',
    'form.area': 'שטח',
    'form.floor': 'קומה',
    'form.total.floors': 'סך קומות',
    'form.year.built': 'שנת בנייה',
    'form.parking.spots': 'מקומות חניה',
    'form.contact.name': 'שם איש קשר',
    'form.contact.phone': 'טלפון איש קשר',
    'form.contact.email': 'אימייל איש קשר',
    'form.submit': 'שלח',
    'form.cancel': 'בטל',
    'form.save': 'שמור',
    
    // Page Titles
    'page.home': 'דף הבית - נדל"ן ישראל',
    'page.search': 'חיפוש נכסים',
    'page.list.property': 'פרסם את הנכס שלך',
    'page.property.details': 'פרטי הנכס',
    
    // Status Messages
    'status.pending': 'ממתין',
    'status.approved': 'מאושר',
    'status.rejected': 'נדחה',
    'status.sold': 'נמכר',
    'status.rented': 'הושכר',
    'status.available': 'זמין',
    
    // Units and Measurements
    'unit.sqm': 'מ"ר',
    'unit.room': 'חדר',
    'unit.rooms': 'חדרים',
    'unit.floor.short': 'ק\'',
    'unit.year': 'שנה'
  },
  fr: {
    // Header Navigation
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
    'grid.empty.title': 'Aucune propriété trouvée',
    'grid.empty.message': 'Essayez d\'ajuster vos filtres de recherche pour voir plus de résultats.',
    'grid.empty.clear': 'Effacer tous les filtres',
    'grid.loading': 'Chargement des propriétés...',
    
    // Property Details
    'details.back': 'Retour à la recherche',
    'details.loading': 'Chargement des détails de la propriété...',
    'details.notfound.title': 'Propriété introuvable',
    'details.notfound.message': 'La propriété que vous recherchez n\'existe pas ou a été supprimée.',
    'details.bedrooms': 'chambres',
    'details.bathrooms': 'salles de bain',
    'details.area': 'Surface',
    'details.contact': 'Contacter l\'agent',
    'details.original': 'Voir l\'original',
    'details.type': 'Type',
    'details.neighborhood': 'Quartier',
    'details.description': 'Description',
    
    // Search Filters
    'filters.property.type': 'Type de propriété',
    'filters.property.any': 'Tous',
    'filters.property.apartment': 'Appartement',
    'filters.property.house': 'Maison',
    'filters.property.villa': 'Villa',
    'filters.property.penthouse': 'Penthouse',
    'filters.property.studio': 'Studio',
    'filters.price.min': 'Prix minimum',
    'filters.price.max': 'Prix maximum',
    'filters.price.no.min': 'Pas de minimum',
    'filters.price.no.max': 'Pas de maximum',
    'filters.bedrooms': 'Chambres',
    'filters.bathrooms': 'Salles de bain',
    'filters.neighborhood': 'Quartier',
    'filters.search': 'Rechercher',
    'filters.clear': 'Effacer tous les filtres',
    'filters.more': 'Plus de filtres',
    'filters.apply': 'Appliquer les filtres',
    'filters.features': 'Caractéristiques de la propriété',
    'filters.parking': 'Parking',
    'filters.balcony': 'Balcon',
    'filters.elevator': 'Ascenseur',
    'filters.garden': 'Jardin',
    'filters.safe.room': 'Pièce sécurisée',
    'filters.bomb.shelter': 'Abri anti-bombes',
    'filters.air.conditioning': 'Climatisation',
    'filters.heating': 'Chauffage',
    'filters.furnished': 'Meublé',
    'filters.pets.allowed': 'Animaux autorisés',
    
    // Search Results Header
    'search.results.for.sale': 'Propriétés à vendre à',
    'search.results.to.rent': 'Propriétés à louer à',
    'search.results.subtitle': 'Recherchez des propriétés pour trouver votre maison parfaite',
    
    // Property Types for Database Content
    'property.type.apartment': 'Appartement',
    'property.type.house': 'Maison',
    'property.type.villa': 'Villa',
    'property.type.penthouse': 'Penthouse',
    'property.type.studio': 'Studio',
    'property.type.duplex': 'Duplex',
    'property.type.cottage': 'Cottage',
    'property.type.townhouse': 'Maison de ville',
    
    // Common Property Info
    'common.price': 'Prix',
    'common.location': 'Emplacement',
    'common.type': 'Type',
    'common.size': 'Taille',
    'common.bedrooms': 'Chambres',
    'common.bathrooms': 'Salles de bain',
    'common.floor': 'Étage',
    'common.year.built': 'Année de construction',
    'common.parking': 'Parking',
    'common.contact': 'Contact',
    'common.phone': 'Téléphone',
    'common.email': 'Email',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.try.again': 'Réessayer',
    'common.unavailable': 'N/A',
    
    // Featured Properties
    'featured.title': 'Propriétés en vedette',
    'featured.subtitle': 'Découvrez notre sélection de propriétés premium',
    
    // Form Labels
    'form.title': 'Titre',
    'form.description': 'Description',
    'form.address': 'Adresse',
    'form.city': 'Ville',
    'form.neighborhood': 'Quartier',
    'form.price': 'Prix',
    'form.bedrooms': 'Chambres',
    'form.bathrooms': 'Salles de bain',
    'form.area': 'Surface',
    'form.floor': 'Étage',
    'form.total.floors': 'Étages totaux',
    'form.year.built': 'Année de construction',
    'form.parking.spots': 'Places de parking',
    'form.contact.name': 'Nom du contact',
    'form.contact.phone': 'Téléphone du contact',
    'form.contact.email': 'Email du contact',
    'form.submit': 'Soumettre',
    'form.cancel': 'Annuler',
    'form.save': 'Sauvegarder',
    
    // Page Titles
    'page.home': 'Accueil - Immobilier Israël',
    'page.search': 'Recherche de propriétés',
    'page.list.property': 'Listez votre propriété',
    'page.property.details': 'Détails de la propriété',
    
    // Status Messages
    'status.pending': 'En attente',
    'status.approved': 'Approuvé',
    'status.rejected': 'Rejeté',
    'status.sold': 'Vendu',
    'status.rented': 'Loué',
    'status.available': 'Disponible',
    
    // Units and Measurements
    'unit.sqm': 'm²',
    'unit.room': 'pièce',
    'unit.rooms': 'pièces',
    'unit.floor.short': 'ét.',
    'unit.year': 'année'
  },
  ru: {
    // Header Navigation
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
    'grid.empty.title': 'Объекты не найдены',
    'grid.empty.message': 'Попробуйте изменить фильтры поиска, чтобы увидеть больше результатов.',
    'grid.empty.clear': 'Очистить все фильтры',
    'grid.loading': 'Загрузка объектов...',
    
    // Property Details
    'details.back': 'Назад к поиску',
    'details.loading': 'Загрузка данных объекта...',
    'details.notfound.title': 'Объект не найден',
    'details.notfound.message': 'Объект, который вы ищете, не существует или был удален.',
    'details.bedrooms': 'спален',
    'details.bathrooms': 'ванных комнат',
    'details.area': 'Площадь',
    'details.contact': 'Связаться с агентом',
    'details.original': 'Посмотреть оригинал',
    'details.type': 'Тип',
    'details.neighborhood': 'Район',
    'details.description': 'Описание',
    
    // Search Filters
    'filters.property.type': 'Тип недвижимости',
    'filters.property.any': 'Любой',
    'filters.property.apartment': 'Квартира',
    'filters.property.house': 'Дом',
    'filters.property.villa': 'Вилла',
    'filters.property.penthouse': 'Пентхаус',
    'filters.property.studio': 'Студия',
    'filters.price.min': 'Минимальная цена',
    'filters.price.max': 'Максимальная цена',
    'filters.price.no.min': 'Без минимума',
    'filters.price.no.max': 'Без максимума',
    'filters.bedrooms': 'Спальни',
    'filters.bathrooms': 'Ванные',
    'filters.neighborhood': 'Район',
    'filters.search': 'Поиск',
    'filters.clear': 'Очистить все фильтры',
    'filters.more': 'Больше фильтров',
    'filters.apply': 'Применить фильтры',
    'filters.features': 'Особенности объекта',
    'filters.parking': 'Парковка',
    'filters.balcony': 'Балкон',
    'filters.elevator': 'Лифт',
    'filters.garden': 'Сад',
    'filters.safe.room': 'Безопасная комната',
    'filters.bomb.shelter': 'Бомбоубежище',
    'filters.air.conditioning': 'Кондиционер',
    'filters.heating': 'Отопление',
    'filters.furnished': 'С мебелью',
    'filters.pets.allowed': 'Можно с животными',
    
    // Search Results Header
    'search.results.for.sale': 'Недвижимость на продажу в',
    'search.results.to.rent': 'Недвижимость в аренду в',
    'search.results.subtitle': 'Ищите недвижимость, чтобы найти свой идеальный дом',
    
    // Property Types for Database Content
    'property.type.apartment': 'Квартира',
    'property.type.house': 'Дом',
    'property.type.villa': 'Вилла',
    'property.type.penthouse': 'Пентхаус',
    'property.type.studio': 'Студия',
    'property.type.duplex': 'Дуплекс',
    'property.type.cottage': 'Коттедж',
    'property.type.townhouse': 'Таунхаус',
    
    // Common Property Info
    'common.price': 'Цена',
    'common.location': 'Местоположение',
    'common.type': 'Тип',
    'common.size': 'Размер',
    'common.bedrooms': 'Спальни',
    'common.bathrooms': 'Ванные комнаты',
    'common.floor': 'Этаж',
    'common.year.built': 'Год постройки',
    'common.parking': 'Парковка',
    'common.contact': 'Контакт',
    'common.phone': 'Телефон',
    'common.email': 'Email',
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка',
    'common.try.again': 'Попробовать снова',
    'common.unavailable': 'Н/Д',
    
    // Featured Properties
    'featured.title': 'Рекомендуемые объекты',
    'featured.subtitle': 'Откройте нашу подборку премиальной недвижимости',
    
    // Form Labels
    'form.title': 'Заголовок',
    'form.description': 'Описание',
    'form.address': 'Адрес',
    'form.city': 'Город',
    'form.neighborhood': 'Район',
    'form.price': 'Цена',
    'form.bedrooms': 'Спальни',
    'form.bathrooms': 'Ванные',
    'form.area': 'Площадь',
    'form.floor': 'Этаж',
    'form.total.floors': 'Всего этажей',
    'form.year.built': 'Год постройки',
    'form.parking.spots': 'Парковочных мест',
    'form.contact.name': 'Имя контакта',
    'form.contact.phone': 'Телефон контакта',
    'form.contact.email': 'Email контакта',
    'form.submit': 'Отправить',
    'form.cancel': 'Отмена',
    'form.save': 'Сохранить',
    
    // Page Titles
    'page.home': 'Главная - Недвижимость Израиль',
    'page.search': 'Поиск недвижимости',
    'page.list.property': 'Разместить объект',
    'page.property.details': 'Детали объекта',
    
    // Status Messages
    'status.pending': 'Ожидает',
    'status.approved': 'Одобрено',
    'status.rejected': 'Отклонено',
    'status.sold': 'Продано',
    'status.rented': 'Сдано',
    'status.available': 'Доступно',
    
    // Units and Measurements
    'unit.sqm': 'кв.м',
    'unit.room': 'комната',
    'unit.rooms': 'комнат',
    'unit.floor.short': 'эт.',
    'unit.year': 'год'
  },
  ar: {
    // Header Navigation
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
    'grid.empty.title': 'لم يتم العثور على عقارات',
    'grid.empty.message': 'حاول تعديل مرشحات البحث لرؤية المزيد من النتائج.',
    'grid.empty.clear': 'مسح جميع المرشحات',
    'grid.loading': 'تحميل العقارات...',
    
    // Property Details
    'details.back': 'العودة إلى البحث',
    'details.loading': 'تحميل تفاصيل العقار...',
    'details.notfound.title': 'العقار غير موجود',
    'details.notfound.message': 'العقار الذي تبحث عنه غير موجود أو تم حذفه.',
    'details.bedrooms': 'غرف نوم',
    'details.bathrooms': 'حمامات',
    'details.area': 'المساحة',
    'details.contact': 'اتصل بالوكيل',
    'details.original': 'عرض الأصل',
    'details.type': 'النوع',
    'details.neighborhood': 'الحي',
    'details.description': 'الوصف',
    
    // Search Filters
    'filters.property.type': 'نوع العقار',
    'filters.property.any': 'أي',
    'filters.property.apartment': 'شقة',
    'filters.property.house': 'منزل',
    'filters.property.villa': 'فيلا',
    'filters.property.penthouse': 'بنتهاوس',
    'filters.property.studio': 'استوديو',
    'filters.price.min': 'الحد الأدنى للسعر',
    'filters.price.max': 'الحد الأقصى للسعر',
    'filters.price.no.min': 'لا يوجد حد أدنى',
    'filters.price.no.max': 'لا يوجد حد أقصى',
    'filters.bedrooms': 'غرف النوم',
    'filters.bathrooms': 'الحمامات',
    'filters.neighborhood': 'الحي',
    'filters.search': 'بحث',
    'filters.clear': 'مسح جميع المرشحات',
    'filters.more': 'مرشحات أكثر',
    'filters.apply': 'تطبيق المرشحات',
    'filters.features': 'ميزات العقار',
    'filters.parking': 'مواقف سيارات',
    'filters.balcony': 'شرفة',
    'filters.elevator': 'مصعد',
    'filters.garden': 'حديقة',
    'filters.safe.room': 'غرفة آمنة',
    'filters.bomb.shelter': 'ملجأ قنابل',
    'filters.air.conditioning': 'تكييف الهواء',
    'filters.heating': 'تدفئة',
    'filters.furnished': 'مفروش',
    'filters.pets.allowed': 'مسموح بالحيوانات الأليفة',
    
    // Search Results Header
    'search.results.for.sale': 'عقارات للبيع في',
    'search.results.to.rent': 'عقارات للإيجار في',
    'search.results.subtitle': 'ابحث عن العقارات للعثور على منزلك المثالي',
    
    // Property Types for Database Content
    'property.type.apartment': 'شقة',
    'property.type.house': 'منزل',
    'property.type.villa': 'فيلا',
    'property.type.penthouse': 'بنتهاوس',
    'property.type.studio': 'استوديو',
    'property.type.duplex': 'دوبلكس',
    'property.type.cottage': 'كوخ',
    'property.type.townhouse': 'منزل مدينة',
    
    // Common Property Info
    'common.price': 'السعر',
    'common.location': 'الموقع',
    'common.type': 'النوع',
    'common.size': 'الحجم',
    'common.bedrooms': 'غرف النوم',
    'common.bathrooms': 'الحمامات',
    'common.floor': 'الطابق',
    'common.year.built': 'سنة البناء',
    'common.parking': 'مواقف سيارات',
    'common.contact': 'تواصل',
    'common.phone': 'هاتف',
    'common.email': 'بريد إلكتروني',
    'common.loading': 'تحميل...',
    'common.error': 'خطأ',
    'common.try.again': 'حاول مرة أخرى',
    'common.unavailable': 'غير متوفر',
    
    // Featured Properties
    'featured.title': 'عقارات مميزة',
    'featured.subtitle': 'اكتشف مجموعتنا المختارة من العقارات المميزة',
    
    // Form Labels
    'form.title': 'العنوان',
    'form.description': 'الوصف',
    'form.address': 'العنوان',
    'form.city': 'المدينة',
    'form.neighborhood': 'الحي',
    'form.price': 'السعر',
    'form.bedrooms': 'غرف النوم',
    'form.bathrooms': 'الحمامات',
    'form.area': 'المساحة',
    'form.floor': 'الطابق',
    'form.total.floors': 'إجمالي الطوابق',
    'form.year.built': 'سنة البناء',
    'form.parking.spots': 'مواقف السيارات',
    'form.contact.name': 'اسم جهة الاتصال',
    'form.contact.phone': 'هاتف جهة الاتصال',
    'form.contact.email': 'بريد جهة الاتصال',
    'form.submit': 'إرسال',
    'form.cancel': 'إلغاء',
    'form.save': 'حفظ',
    
    // Page Titles
    'page.home': 'الرئيسية - عقارات إسرائيل',
    'page.search': 'البحث عن العقارات',
    'page.list.property': 'اعرض عقارك',
    'page.property.details': 'تفاصيل العقار',
    
    // Status Messages
    'status.pending': 'في الانتظار',
    'status.approved': 'موافق عليه',
    'status.rejected': 'مرفوض',
    'status.sold': 'مباع',
    'status.rented': 'مؤجر',
    'status.available': 'متوفر',
    
    // Units and Measurements
    'unit.sqm': 'م²',
    'unit.room': 'غرفة',
    'unit.rooms': 'غرف',
    'unit.floor.short': 'ط.',
    'unit.year': 'سنة'
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
