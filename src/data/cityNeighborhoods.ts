
export const cityNeighborhoods: Record<string, string[]> = {
  'Tel Aviv': [
    'Florentin',
    'Jaffa',
    'Kerem HaTeimanim',
    'Neve Tzedek',
    'Old North',
    'Ramat Aviv'
  ],
  'Jerusalem': [
    'Baka',
    'Ein Kerem',
    'French Hill',
    'German Colony',
    'Gilo',
    'Givat Ram',
    'Katamon',
    'Mea Shearim',
    'Mount of Olives',
    'Nachlaot',
    'Old City',
    'Pisgat Ze\'ev',
    'Ramat Eshkol',
    'Rehavia',
    'Silwan',
    'Talbieh',
    'Talpiot',
    'Yemin Moshe'
  ],
  'Haifa': [
    'Bat Galim',
    'Carmel Center',
    'Denia',
    'Hadar HaCarmel',
    'Neve Shaanan'
  ],
  'Herzliya': [
    'Herzliya Pituach',
    'Old Herzliya',
    'Neve Amirim',
    'Seven Stars'
  ],
  'Ramat Gan': [
    'Diamond Exchange District',
    'Old Ramat Gan',
    'Kiryat Borochov',
    'Shchunat Hatikvah'
  ],
  'Netanya': [
    'Old City',
    'Kiryat Nordau',
    'Kiryat Hasharon',
    'Ramat Poleg'
  ],
  'Ashdod': [
    'City Center',
    'Marina',
    'Rova Dalet',
    'Rova Gimmel'
  ],
  'Beer Sheva': [
    'Old City',
    'Ramot',
    'Neve Noy',
    'Dalet'
  ],
  'Petah Tikva': [
    'City Center',
    'Kiryat Matalon',
    'Neve Ganim',
    'Segula'
  ],
  'Rehovot': [
    'City Center',
    'Kiryat Moshe',
    'Neve Ramat Eliyahu',
    'Ramot'
  ]
};

// Helper function to get neighborhoods for a city
export const getNeighborhoodsForCity = (city: string): string[] => {
  return cityNeighborhoods[city] || [];
};

// Helper function to extract city name from location string
export const extractCityFromLocation = (location: string): string => {
  // Handle cases like "Florentin, Tel Aviv" or just "Tel Aviv"
  if (location.includes(',')) {
    return location.split(',').pop()?.trim() || '';
  }
  return location.trim();
};
