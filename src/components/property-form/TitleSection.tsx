
import React, { useState } from 'react';
import { Control, useWatch, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { PropertyFormData } from './PropertyFormSchema';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface TitleSectionProps {
  control: Control<PropertyFormData>;
}

export const TitleSection = ({ control }: TitleSectionProps) => {
  const { toast } = useToast();
  const { setValue } = useFormContext<PropertyFormData>();
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);

  // Watch all form fields to get current values for AI generation
  const formValues = useWatch({ control });

  const generateTitle = async () => {
    setIsGeneratingTitle(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-property-title', {
        body: { propertyData: formValues }
      });

      if (error) throw error;

      // Set the generated title in the form using setValue
      setValue('title', data.title);

      toast({
        title: "Title generated!",
        description: "AI has created a property title based on your details.",
      });
    } catch (error) {
      console.error('Error generating title:', error);
      toast({
        title: "Error",
        description: "Failed to generate title. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  return (
    <div className="space-y-2">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Beautiful apartment in the city center" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={generateTitle}
        disabled={isGeneratingTitle || !formValues.city}
        className="w-full"
      >
        {isGeneratingTitle ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4 mr-2" />
        )}
        {isGeneratingTitle ? 'Generating...' : 'Generate Title with AI'}
      </Button>
      {!formValues.city && (
        <p className="text-sm text-muted-foreground">
          Please fill in the location details first to generate a title.
        </p>
      )}
    </div>
  );
};
