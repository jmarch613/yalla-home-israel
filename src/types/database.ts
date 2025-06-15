
export interface ScrapedProperty {
  id: string;
  title: string | null;
  price: string | null;
  address: string | null;
  description: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  property_type: string | null;
  neighborhood: string | null;
  image_url: string | null;
  listing_url: string | null;
  source_website: string | null;
  created_at: string;
}

export interface PropertyListing {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  price: number | null;
  property_type: 'apartment' | 'house' | 'villa' | 'penthouse' | 'studio' | 'commercial' | 'land';
  listing_type: 'sale' | 'rent';
  address: string;
  neighborhood: string | null;
  city: string;
  bedrooms: number | null;
  bathrooms: number | null;
  living_rooms: number | null;
  area: number | null;
  floor_number: number | null;
  total_floors: number | null;
  year_built: number | null;
  parking_spots: number;
  contact_name: string;
  contact_phone: string;
  contact_email: string | null;
  balcony: boolean;
  elevator: boolean;
  garden: boolean;
  air_conditioning: boolean;
  heating: boolean;
  furnished: boolean;
  pets_allowed: boolean;
  safe_room: boolean;
  bomb_shelter: boolean;
  images: string[];
  floorplan_url: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'published';
  created_at: string;
  updated_at: string;
}
