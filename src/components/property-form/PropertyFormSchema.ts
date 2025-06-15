
import * as z from 'zod';

export const propertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive').optional(),
  property_type: z.enum(['apartment', 'house', 'villa', 'penthouse', 'studio', 'commercial', 'land']),
  listing_type: z.enum(['sale', 'rent']),
  address: z.string().min(1, 'Address is required'),
  neighborhood: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  living_rooms: z.number().min(0).optional(),
  area: z.number().min(1, 'Area must be greater than 0').optional(),
  floor_number: z.number().optional(),
  total_floors: z.number().optional(),
  year_built: z.number().min(1800).max(new Date().getFullYear()).optional(),
  parking_spots: z.number().min(0).default(0),
  contact_name: z.string().min(1, 'Contact name is required'),
  contact_phone: z.string().min(1, 'Contact phone is required'),
  contact_email: z.string().email().optional(),
  balcony: z.boolean().default(false),
  elevator: z.boolean().default(false),
  garden: z.boolean().default(false),
  air_conditioning: z.boolean().default(false),
  heating: z.boolean().default(false),
  furnished: z.boolean().default(false),
  pets_allowed: z.boolean().default(false),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
