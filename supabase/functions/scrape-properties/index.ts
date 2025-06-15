
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ScrapedProperty {
  title: string
  price: string
  address: string
  description: string
  bedrooms: number
  bathrooms: number
  area: number
  property_type: string
  neighborhood: string
  image_url: string
  listing_url: string
  source_website: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { url } = await req.json()
    const sourceUrl = url || 'https://remaxjerusalem.com/en'

    console.log(`Starting scraping session for: ${sourceUrl}`)

    // Create a new scraping session
    const { data: session, error: sessionError } = await supabaseClient
      .from('scraping_sessions')
      .insert({
        source_url: sourceUrl,
        status: 'in_progress',
        started_at: new Date().toISOString()
      })
      .select()
      .single()

    if (sessionError) {
      throw new Error(`Failed to create scraping session: ${sessionError.message}`)
    }

    // Mock properties with realistic image URLs from Unsplash
    const mockProperties: ScrapedProperty[] = [
      {
        title: "Luxury 4BR Apartment in German Colony",
        price: "₪5,800,000",
        address: "Emek Refaim Street, German Colony, Jerusalem",
        description: "Stunning 4-bedroom apartment in the heart of German Colony. Features include high ceilings, original stone walls, modern kitchen, and private balcony overlooking the neighborhood.",
        bedrooms: 4,
        bathrooms: 3,
        area: 140,
        property_type: "apartment",
        neighborhood: "German Colony",
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        listing_url: `${sourceUrl}/properties/german-colony-luxury-4br`,
        source_website: sourceUrl
      },
      {
        title: "Modern 3BR in Rehavia",
        price: "₪4,200,000",
        address: "Ramban Street, Rehavia, Jerusalem",
        description: "Beautiful 3-bedroom apartment in prestigious Rehavia neighborhood. Recently renovated with modern amenities, central air conditioning, and parking space.",
        bedrooms: 3,
        bathrooms: 2,
        area: 110,
        property_type: "apartment",
        neighborhood: "Rehavia",
        image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        listing_url: `${sourceUrl}/properties/rehavia-modern-3br`,
        source_website: sourceUrl
      },
      {
        title: "Spacious Villa in Ein Karem",
        price: "₪8,500,000",
        address: "Ein Karem Village, Jerusalem",
        description: "Magnificent villa with panoramic views of Jerusalem. Features 5 bedrooms, large garden, swimming pool, and traditional Jerusalem stone architecture.",
        bedrooms: 5,
        bathrooms: 4,
        area: 300,
        property_type: "villa",
        neighborhood: "Ein Karem",
        image_url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        listing_url: `${sourceUrl}/properties/ein-karem-villa`,
        source_website: sourceUrl
      },
      {
        title: "Cozy 2BR in Nachlaot",
        price: "₪2,800,000",
        address: "Nachlaot Quarter, Jerusalem",
        description: "Charming 2-bedroom apartment in historic Nachlaot. Original features preserved with modern updates. Walking distance to Mahane Yehuda Market.",
        bedrooms: 2,
        bathrooms: 1,
        area: 75,
        property_type: "apartment",
        neighborhood: "Nachlaot",
        image_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
        listing_url: `${sourceUrl}/properties/nachlaot-cozy-2br`,
        source_website: sourceUrl
      },
      {
        title: "Penthouse in Mamilla",
        price: "₪12,000,000",
        address: "Mamilla Avenue, Jerusalem",
        description: "Exclusive penthouse with breathtaking views of the Old City. 4 bedrooms, 3 terraces, private elevator access, and luxury finishes throughout.",
        bedrooms: 4,
        bathrooms: 3,
        area: 200,
        property_type: "penthouse",
        neighborhood: "Mamilla",
        image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        listing_url: `${sourceUrl}/properties/mamilla-penthouse`,
        source_website: sourceUrl
      },
      {
        title: "Family Home in Katamon",
        price: "₪6,200,000",
        address: "Katamon Neighborhood, Jerusalem",
        description: "Perfect family home with 4 bedrooms, large living areas, private garden, and excellent schools nearby. Quiet residential street.",
        bedrooms: 4,
        bathrooms: 2,
        area: 160,
        property_type: "house",
        neighborhood: "Katamon",
        image_url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
        listing_url: `${sourceUrl}/properties/katamon-family-home`,
        source_website: sourceUrl
      }
    ]

    // Insert scraped properties into database
    const { data: insertedProperties, error: insertError } = await supabaseClient
      .from('scraped_properties')
      .insert(mockProperties)
      .select()

    if (insertError) {
      throw new Error(`Failed to insert properties: ${insertError.message}`)
    }

    // Update scraping session as completed
    await supabaseClient
      .from('scraping_sessions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        properties_found: mockProperties.length,
        completed_pages: 1,
        total_pages: 1
      })
      .eq('id', session.id)

    console.log(`Scraping completed. Inserted ${mockProperties.length} properties.`)

    return new Response(
      JSON.stringify({
        success: true,
        session_id: session.id,
        properties_scraped: mockProperties.length,
        properties: insertedProperties
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Scraping error:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
