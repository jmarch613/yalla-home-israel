
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    console.log('Starting property photo analysis with OpenAI...');
    
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const { imageUrls } = await req.json();
    console.log('Received image URLs for analysis:', imageUrls?.length || 0);

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      throw new Error('No images provided for analysis');
    }

    // Prepare images for OpenAI Vision API (limit to first 5 images for cost efficiency)
    const imagesToAnalyze = imageUrls.slice(0, 5).map(url => ({
      type: "image_url",
      image_url: {
        url: url,
        detail: "high"
      }
    }));

    const prompt = `Analyze these property photos and provide a comprehensive assessment of the property's condition and modernization level. 

Please evaluate and provide scores (1-10, where 10 is excellent/modern) for:

1. OVERALL CONDITION (1-10):
   - Structural integrity and maintenance
   - General wear and tear
   - Cleanliness and upkeep

2. MODERNIZATION LEVEL (1-10):
   - Kitchen modernization (appliances, countertops, cabinets)
   - Bathroom modernization (fixtures, tiles, vanities)
   - Flooring quality and modernity
   - Windows and doors condition
   - Lighting fixtures and electrical
   - Paint and wall finishes

3. SPECIFIC ROOM ASSESSMENTS:
   - Kitchen: condition and modernization details
   - Bathrooms: condition and modernization details
   - Living areas: condition and modernization details
   - Bedrooms: condition and modernization details

4. KEY OBSERVATIONS:
   - Notable modern features or upgrades
   - Areas needing improvement or renovation
   - Estimated renovation timeline (recent, moderate, outdated)

5. MARKET READINESS:
   - Move-in ready status
   - Recommended improvements before listing
   - Estimated condition category (Excellent, Good, Fair, Needs Work)

Format your response as JSON with the following structure:
{
  "overall_condition_score": number,
  "modernization_score": number,
  "condition_summary": "brief overall assessment",
  "modernization_summary": "brief modernization assessment",
  "room_assessments": {
    "kitchen": "detailed assessment",
    "bathrooms": "detailed assessment",
    "living_areas": "detailed assessment",
    "bedrooms": "detailed assessment"
  },
  "key_observations": {
    "modern_features": ["list of modern features found"],
    "areas_needing_improvement": ["list of areas needing work"],
    "renovation_timeline": "recent/moderate/outdated"
  },
  "market_readiness": {
    "move_in_ready": boolean,
    "condition_category": "Excellent/Good/Fair/Needs Work",
    "recommended_improvements": ["list of recommended improvements"]
  }
}

Be thorough but concise. Focus on details visible in the photos.`;

    console.log('Making request to OpenAI Vision API...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              },
              ...imagesToAnalyze
            ]
          }
        ],
        max_tokens: 1500,
        temperature: 0.3,
      }),
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error response:', errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API response received');
    
    const analysisText = data.choices[0].message.content.trim();
    console.log('Generated analysis:', analysisText);

    // Try to parse as JSON, fallback to text if parsing fails
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (parseError) {
      console.warn('Failed to parse as JSON, returning as text:', parseError);
      analysis = {
        overall_condition_score: 0,
        modernization_score: 0,
        condition_summary: analysisText,
        modernization_summary: "Analysis provided as text format",
        room_assessments: {},
        key_observations: {
          modern_features: [],
          areas_needing_improvement: [],
          renovation_timeline: "unknown"
        },
        market_readiness: {
          move_in_ready: false,
          condition_category: "Unknown",
          recommended_improvements: []
        }
      };
    }

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-property-photos function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
