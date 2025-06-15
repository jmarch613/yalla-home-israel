
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface PhotoAnalysis {
  overall_condition_score: number;
  modernization_score: number;
  condition_summary: string;
  modernization_summary: string;
  room_assessments: {
    kitchen?: string;
    bathrooms?: string;
    living_areas?: string;
    bedrooms?: string;
  };
  key_observations: {
    modern_features: string[];
    areas_needing_improvement: string[];
    renovation_timeline: string;
  };
  market_readiness: {
    move_in_ready: boolean;
    condition_category: string;
    recommended_improvements: string[];
  };
}

export const usePhotoAnalysis = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PhotoAnalysis | null>(null);

  const analyzePhotos = async (imageUrls: string[]) => {
    if (!imageUrls || imageUrls.length === 0) {
      toast({
        title: "No photos to analyze",
        description: "Please upload some property photos first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-property-photos', {
        body: { imageUrls }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast({
        title: "Photo analysis complete!",
        description: "AI has analyzed your property photos and provided condition assessment.",
      });
    } catch (error) {
      console.error('Error analyzing photos:', error);
      toast({
        title: "Analysis failed",
        description: "Failed to analyze photos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    analysis,
    analyzePhotos,
    setAnalysis
  };
};
