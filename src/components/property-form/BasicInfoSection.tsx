
import React, { useState } from 'react';
import { Control, useWatch, useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { PropertyFormData } from './PropertyFormSchema';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface BasicInfoSectionProps {
  control: Control<PropertyFormData>;
}

export const BasicInfoSection = ({ control }: BasicInfoSectionProps) => {
  const { toast } = useToast();
  const { setValue } = useFormContext<PropertyFormData>();
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
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
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (₪)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter price" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="property_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="listing_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
