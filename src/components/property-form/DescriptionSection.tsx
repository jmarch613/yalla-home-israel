
import React, { useState } from 'react';
import { Control, useWatch, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { PropertyFormData } from './PropertyFormSchema';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface DescriptionSectionProps {
  control: Control<PropertyFormData>;
}

export const DescriptionSection = ({ control }: DescriptionSectionProps) => {
  const { toast } = useToast();
  const { setValue } = useFormContext<PropertyFormData>();
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  // Watch all form fields to get current values for AI generation
  const formValues = useWatch({ control });

  const generateDescription = async () => {
    setIsGeneratingDescription(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-property-description', {
        body: { propertyData: formValues }
      });

      if (error) throw error;

      // Set the generated description in the form using setValue
      setValue('description', data.description);

      toast({
        title: "Description generated!",
        description: "AI has created a property description based on your details.",
      });
    } catch (error) {
      console.error('Error generating description:', error);
      toast({
        title: "Error",
        description: "Failed to generate description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  return (
    <div className="space-y-2">
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your property..." 
                className="min-h-[120px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={generateDescription}
        disabled={isGeneratingDescription || !formValues.city}
        className="w-full"
      >
        {isGeneratingDescription ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4 mr-2" />
        )}
        {isGeneratingDescription ? 'Generating...' : 'Generate Description with AI'}
      </Button>
      {!formValues.city && (
        <p className="text-sm text-muted-foreground">
          Please fill in the location details first to generate a description.
        </p>
      )}
    </div>
  );
};
