
/**
 * Transform a user-submitted property row into the PropertyCardType used throughout the UI
 */
import type { PropertyListing } from "@/types/database";
import type { PropertyCardType } from "@/utils/propertyFiltering";

export function transformUserPropertyToCardType(property: PropertyListing): PropertyCardType {
  console.log('Transforming user property:', property.title, 'City:', property.city, 'Address:', property.address);
  
  return {
    id: property.id,
    title: property.title || "Property Title",
    location: property.city || property.address || "Jerusalem", // Use city first, then address
    price: property.price ? `₪${property.price}` : "₪0",
    type: property.listing_type ?? "sale",
    bedrooms: property.bedrooms ?? 0,
    bathrooms: property.bathrooms ?? 0,
    area: property.area ?? 0,
    image:
      Array.isArray(property.images) && property.images.length > 0
        ? property.images[0]
        : "/placeholder.svg",
    features: [
      property.property_type || "Property",
      property.neighborhood || property.city || "Jerusalem",
      ...(property.balcony ? ["Balcony"] : []),
      ...(property.elevator ? ["Elevator"] : []),
      ...(property.garden ? ["Garden"] : []),
      ...(property.air_conditioning ? ["Air Conditioning"] : []),
      ...(property.heating ? ["Heating"] : []),
      ...(property.furnished ? ["Furnished"] : []),
      ...(property.pets_allowed ? ["Pets Allowed"] : []),
      ...(property.safe_room ? ["Safe Room"] : []),
      ...(property.bomb_shelter ? ["Bomb Shelter"] : []),
      "User Listing", // Always add this to distinguish user listings
    ].filter(Boolean),
    created_at: property.created_at,
    city: property.city || "Jerusalem", // Add city field for filtering
    neighborhood: property.neighborhood // Add neighborhood field for filtering
  };
}
