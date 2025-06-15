
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
    console.log('Starting property title generation...');
    
    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const { propertyData } = await req.json();
    console.log('Property data received:', propertyData);

    const prompt = `Create a compelling and concise property title for a ${propertyData.property_type} in ${propertyData.city}${propertyData.neighborhood ? `, ${propertyData.neighborhood}` : ''}.

Property details:
- Type: ${propertyData.property_type}
- Listing: For ${propertyData.listing_type}
- Location: ${propertyData.city}${propertyData.neighborhood ? `, ${propertyData.neighborhood}` : ''}
${propertyData.bedrooms ? `- Bedrooms: ${propertyData.bedrooms}` : ''}
${propertyData.bathrooms ? `- Bathrooms: ${propertyData.bathrooms}` : ''}
${propertyData.area ? `- Area: ${propertyData.area} sq meters` : ''}
${propertyData.floor_number ? `- Floor: ${propertyData.floor_number}` : ''}

Features:
${propertyData.balcony ? '- Balcony' : ''}
${propertyData.elevator ? '- Elevator' : ''}
${propertyData.garden ? '- Garden' : ''}
${propertyData.air_conditioning ? '- Air conditioning' : ''}
${propertyData.heating ? '- Heating' : ''}
${propertyData.furnished ? '- Furnished' : ''}
${propertyData.pets_allowed ? '- Pets allowed' : ''}

Create a catchy, professional title that would attract potential buyers or renters. The title should be:
- Concise and impactful (maximum 8-10 words)
- Include key selling points
- Mention the location
- Be engaging and descriptive

Examples of good titles:
- "Luxury 3BR Apartment with Balcony in Tel Aviv"
- "Modern Furnished Studio in Jerusalem Center"
- "Spacious Villa with Garden in Herzliya"

Write only the title, nothing else.`;

    console.log('Making request to Anthropic API...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 50,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error response:', errorText);
      throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API response data:', data);
    
    const title = data.content[0].text.trim();
    console.log('Generated title:', title);

    return new Response(JSON.stringify({ title }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-property-title function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
