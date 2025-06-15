
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { propertyData } = await req.json();

    const prompt = `Create an engaging property description for a ${propertyData.property_type} in ${propertyData.city}${propertyData.neighborhood ? `, ${propertyData.neighborhood}` : ''}.

Property details:
- Type: ${propertyData.property_type}
- Listing: For ${propertyData.listing_type}
- Location: ${propertyData.address}, ${propertyData.city}${propertyData.neighborhood ? `, ${propertyData.neighborhood}` : ''}
${propertyData.bedrooms ? `- Bedrooms: ${propertyData.bedrooms}` : ''}
${propertyData.bathrooms ? `- Bathrooms: ${propertyData.bathrooms}` : ''}
${propertyData.living_rooms ? `- Living rooms: ${propertyData.living_rooms}` : ''}
${propertyData.area ? `- Area: ${propertyData.area} sq meters` : ''}
${propertyData.floor_number ? `- Floor: ${propertyData.floor_number}` : ''}
${propertyData.parking_spots ? `- Parking spots: ${propertyData.parking_spots}` : ''}
${propertyData.year_built ? `- Year built: ${propertyData.year_built}` : ''}

Features:
${propertyData.balcony ? '- Balcony' : ''}
${propertyData.elevator ? '- Elevator' : ''}
${propertyData.garden ? '- Garden' : ''}
${propertyData.air_conditioning ? '- Air conditioning' : ''}
${propertyData.heating ? '- Heating' : ''}
${propertyData.furnished ? '- Furnished' : ''}
${propertyData.pets_allowed ? '- Pets allowed' : ''}

Write a compelling, professional property description that includes:

1. Property highlights and key features
2. Location benefits and neighborhood character
3. Nearby amenities such as:
   - Shopping centers, markets, and restaurants
   - Schools and educational institutions
   - Medical facilities and hospitals
   - Parks and recreational areas
   - Cultural venues and entertainment
4. Tourist attractions and places of interest in the area
5. Public transportation accessibility:
   - Bus stops and routes
   - Train stations or light rail access
   - Major highways and roads
   - Walking/cycling infrastructure
6. Places of worship nearby (synagogues, mosques, churches, etc.)
7. Business districts and employment centers

Keep the description engaging, informative, and around 150-200 words. Focus on what makes this location special and convenient for potential ${propertyData.listing_type === 'rent' ? 'tenants' : 'buyers'}. Use warm, inviting language that highlights both the property and its strategic location advantages.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${anthropicApiKey}`,
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 400,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const description = data.content[0].text.trim();

    return new Response(JSON.stringify({ description }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-property-description function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
