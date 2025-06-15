
/**
 * Transform a user-submitted property row into the PropertyCardType used throughout the UI
 */
import type { PropertyListing } from "@/types/database";
import type { PropertyCardType } from "@/utils/propertyFiltering";

export function transformUserPropertyToCardType(property: PropertyListing): PropertyCardType {
  return {
    id: property.id,
    title: property.title || "Property Title",
    location: property.address || property.city || "Jerusalem",
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
      property.created_at ? "User Listing" : "",
    ].filter(Boolean),
    created_at: property.created_at,
  };
}
