
-- Insert sample rental properties in Jerusalem area
INSERT INTO public.property_listings (
  title,
  description,
  price,
  property_type,
  listing_type,
  address,
  neighborhood,
  city,
  bedrooms,
  bathrooms,
  living_rooms,
  area,
  floor_number,
  total_floors,
  year_built,
  parking_spots,
  balcony,
  elevator,
  garden,
  air_conditioning,
  heating,
  furnished,
  pets_allowed,
  safe_room,
  bomb_shelter,
  contact_name,
  contact_phone,
  contact_email,
  images,
  status
) VALUES
-- Rental Properties
('Spacious 3BR Apartment in Rehavia', 'Beautiful apartment with high ceilings and original Jerusalem stone features. Walking distance to city center and all amenities.', 8500, 'apartment', 'rent', 'Ramban Street 15', 'Rehavia', 'Jerusalem', 3, 2, 1, 120, 2, 4, 1965, 1, true, true, false, true, true, true, true, true, true, 'Sarah Cohen', '+972-50-123-4567', 'sarah.cohen@email.com', ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop'], 'approved'),

('Modern 2BR in German Colony', 'Newly renovated apartment with modern amenities in the heart of German Colony. Close to cafes and restaurants.', 7200, 'apartment', 'rent', 'Emek Refaim Street 45', 'German Colony', 'Jerusalem', 2, 1, 1, 85, 1, 3, 1920, 0, true, false, false, true, true, true, false, false, false, 'David Levy', '+972-52-987-6543', 'david.levy@email.com', ARRAY['https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop'], 'approved'),

('Luxury Villa in Talbiya', 'Stunning villa with private garden and swimming pool. Perfect for families seeking luxury living in Jerusalem.', 18000, 'villa', 'rent', 'Ibn Shaprut Street 8', 'Talbiya', 'Jerusalem', 5, 3, 2, 300, 1, 2, 1950, 3, true, false, true, true, true, true, true, true, true, 'Rachel Green', '+972-54-111-2222', 'rachel.green@email.com', ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop'], 'approved'),

('Cozy Studio in Nachlaot', 'Charming studio apartment in the artistic Nachlaot neighborhood. Perfect for young professionals or students.', 4500, 'studio', 'rent', 'Agrippas Street 78', 'Nachlaot', 'Jerusalem', 0, 1, 1, 35, 0, 2, 1930, 0, false, false, false, false, true, false, false, false, false, 'Michael Brown', '+972-50-333-4444', 'michael.brown@email.com', ARRAY['https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop'], 'approved'),

('4BR House in Baka', 'Spacious house with garden in family-friendly Baka neighborhood. Great for families with children.', 12000, 'house', 'rent', 'Derech Beit Lechem 25', 'Baka', 'Jerusalem', 4, 2, 1, 180, 0, 1, 1980, 2, false, false, true, true, true, false, true, true, true, 'Anna Wilson', '+972-52-555-6666', 'anna.wilson@email.com', ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop'], 'approved'),

('Penthouse with City View', 'Luxury penthouse with panoramic views of Jerusalem. Modern kitchen and spacious terrace.', 15000, 'penthouse', 'rent', 'King George Street 60', 'City Center', 'Jerusalem', 3, 2, 1, 150, 8, 8, 2010, 2, true, true, false, true, true, true, false, true, true, 'James Miller', '+972-54-777-8888', 'james.miller@email.com', ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop'], 'approved'),

('2BR in Katamon', 'Bright apartment in quiet Katamon neighborhood. Close to parks and public transportation.', 6800, 'apartment', 'rent', 'Pierre Koenig Street 12', 'Katamon', 'Jerusalem', 2, 1, 1, 90, 3, 5, 1975, 1, true, true, false, true, true, false, true, false, false, 'Lisa Davis', '+972-50-999-1010', 'lisa.davis@email.com', ARRAY['https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop'], 'approved'),

('Family Home in Arnona', 'Large family home with garden and parking. Quiet residential area with good schools nearby.', 11500, 'house', 'rent', 'Hebron Road 145', 'Arnona', 'Jerusalem', 4, 3, 2, 200, 0, 1, 1990, 2, false, false, true, true, true, true, true, true, true, 'Robert Johnson', '+972-52-121-2121', 'robert.johnson@email.com', ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop'], 'approved'),

('1BR in Ein Kerem', 'Charming apartment in historic Ein Kerem with stone walls and artistic touches.', 5500, 'apartment', 'rent', 'HaMaayan Street 5', 'Ein Kerem', 'Jerusalem', 1, 1, 1, 60, 1, 2, 1940, 0, true, false, false, false, true, false, false, false, false, 'Emma Thompson', '+972-54-131-4141', 'emma.thompson@email.com', ARRAY['https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop'], 'approved'),

('3BR in Gilo', 'Modern apartment with mountain views in Gilo. Family-friendly building with playground.', 7800, 'apartment', 'rent', 'Gilo Center 88', 'Gilo', 'Jerusalem', 3, 2, 1, 110, 5, 10, 2000, 1, true, true, false, true, true, false, true, true, true, 'Kevin White', '+972-50-151-6161', 'kevin.white@email.com', ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'], 'approved'),

('Luxury 2BR in Mamilla', 'High-end apartment near Mamilla Mall with concierge service and premium amenities.', 13500, 'apartment', 'rent', 'Mamilla Boulevard 18', 'Mamilla', 'Jerusalem', 2, 2, 1, 95, 12, 15, 2015, 1, true, true, false, true, true, true, false, false, true, 'Sophia Garcia', '+972-52-171-8181', 'sophia.garcia@email.com', ARRAY['https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop'], 'approved'),

('4BR House in Mekor Chaim', 'Spacious house with private entrance and garden. Perfect for religious families.', 10500, 'house', 'rent', 'Yehuda Hanasi Street 22', 'Mekor Chaim', 'Jerusalem', 4, 2, 1, 165, 0, 1, 1985, 1, false, false, true, false, true, false, true, false, true, 'Benjamin Martinez', '+972-54-191-2020', 'benjamin.martinez@email.com', ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'], 'approved'),

('Studio in Musrara', 'Artistic studio in trendy Musrara neighborhood. Close to galleries and cultural venues.', 4200, 'studio', 'rent', 'Prophets Street 14', 'Musrara', 'Jerusalem', 0, 1, 1, 32, 2, 3, 1925, 0, false, false, false, false, true, false, false, false, false, 'Olivia Rodriguez', '+972-50-212-2323', 'olivia.rodriguez@email.com', ARRAY['https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop'], 'approved'),

('3BR in French Hill', 'Spacious apartment with parking in French Hill. Good for families with university access.', 8200, 'apartment', 'rent', 'Mordechai Elkalay Street 7', 'French Hill', 'Jerusalem', 3, 2, 1, 125, 4, 8, 1995, 1, true, true, false, true, true, false, true, false, true, 'Daniel Lee', '+972-52-234-5656', 'daniel.lee@email.com', ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'], 'approved'),

('2BR in Givat Shaul', 'Affordable apartment in growing Givat Shaul area. Close to shopping and transportation.', 6200, 'apartment', 'rent', 'Herzl Boulevard 150', 'Givat Shaul', 'Jerusalem', 2, 1, 1, 80, 2, 6, 1970, 0, true, true, false, false, true, false, true, false, false, 'Isabella Clark', '+972-54-256-7878', 'isabella.clark@email.com', ARRAY['https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop'], 'approved'),

('Villa in Kiryat Moshe', 'Beautiful villa with swimming pool and large garden. Premium location with privacy.', 20000, 'villa', 'rent', 'Sokolov Street 35', 'Kiryat Moshe', 'Jerusalem', 6, 4, 2, 350, 1, 2, 1960, 4, true, false, true, true, true, true, true, true, true, 'Matthew Walker', '+972-50-278-9090', 'matthew.walker@email.com', ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop'], 'approved'),

('1BR in Old Katamon', 'Cozy apartment in sought-after Old Katamon. Walking distance to cafes and shops.', 5800, 'apartment', 'rent', 'Rachel Imenu Street 28', 'Old Katamon', 'Jerusalem', 1, 1, 1, 65, 1, 4, 1955, 0, true, false, false, true, true, false, false, false, false, 'Ava Hall', '+972-52-290-1212', 'ava.hall@email.com', ARRAY['https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop'], 'approved'),

('3BR in Pisgat Zeev', 'Modern apartment with elevator and parking in family-friendly Pisgat Zeev.', 7500, 'apartment', 'rent', 'Pisgat Zeev Center 42', 'Pisgat Zeev', 'Jerusalem', 3, 2, 1, 115, 3, 8, 2005, 1, true, true, false, true, true, false, true, true, true, 'Christopher Young', '+972-54-312-3434', 'christopher.young@email.com', ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'], 'approved'),

('House in Neve Yaakov', 'Family house with garden and safe room. Quiet neighborhood with good schools.', 9800, 'house', 'rent', 'Yitzchak Rabin Boulevard 65', 'Neve Yaakov', 'Jerusalem', 4, 2, 1, 170, 0, 1, 1988, 2, false, false, true, true, true, false, true, true, true, 'Grace Allen', '+972-50-334-5656', 'grace.allen@email.com', ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'], 'approved'),

('2BR in Ramat Eshkol', 'Bright apartment with balcony in peaceful Ramat Eshkol. Close to parks and nature.', 6900, 'apartment', 'rent', 'Levi Eshkol Boulevard 18', 'Ramat Eshkol', 'Jerusalem', 2, 1, 1, 88, 4, 6, 1978, 1, true, true, false, true, true, false, false, false, false, 'Alexander King', '+972-52-356-7878', 'alexander.king@email.com', ARRAY['https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop'], 'approved');
