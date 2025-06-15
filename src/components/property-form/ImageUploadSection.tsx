
import React, { useState } from 'react';
import { Control, useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X, Image } from 'lucide-react';
import { PropertyFormData } from './PropertyFormSchema';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploadSectionProps {
  control: Control<PropertyFormData>;
}

export const ImageUploadSection = ({ control }: ImageUploadSectionProps) => {
  const { toast } = useToast();
  const { setValue, watch } = useFormContext<PropertyFormData>();
  const [uploading, setUploading] = useState(false);
  const [uploadingFloorplan, setUploadingFloorplan] = useState(false);

  const images = watch('images') || [];
  const floorplanUrl = watch('floorplan_url');

  const uploadImage = async (file: File, isFloorplan = false) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadPromises = Array.from(files).map(file => uploadImage(file));
    
    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(url => url !== null) as string[];
      
      if (validUrls.length > 0) {
        setValue('images', [...images, ...validUrls]);
        toast({
          title: "Images uploaded",
          description: `Successfully uploaded ${validUrls.length} image(s).`,
        });
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Some images failed to upload.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const handleFloorplanUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFloorplan(true);
    
    try {
      const uploadedUrl = await uploadImage(file, true);
      if (uploadedUrl) {
        setValue('floorplan_url', uploadedUrl);
        toast({
          title: "Floorplan uploaded",
          description: "Successfully uploaded floorplan.",
        });
      }
    } finally {
      setUploadingFloorplan(false);
      // Reset input
      event.target.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setValue('images', updatedImages);
  };

  const removeFloorplan = () => {
    setValue('floorplan_url', undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photos & Floorplan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Images */}
        <div>
          <FormLabel className="text-base font-medium">Property Photos</FormLabel>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={uploading}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploading}
                onClick={() => document.querySelector<HTMLInputElement>('input[type="file"][multiple]')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Upload multiple photos of your property (JPEG, PNG, WebP)
            </p>

            {/* Display uploaded images */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {images.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl}
                      alt={`Property image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Floorplan */}
        <div>
          <FormField
            control={control}
            name="floorplan_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Floorplan</FormLabel>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFloorplanUpload}
                      disabled={uploadingFloorplan}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={uploadingFloorplan}
                      onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]:not([multiple])')?.click()}
                    >
                      <Image className="h-4 w-4 mr-2" />
                      {uploadingFloorplan ? 'Uploading...' : 'Upload'}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload a floorplan of your property (optional)
                  </p>

                  {/* Display uploaded floorplan */}
                  {floorplanUrl && (
                    <div className="relative group mt-4">
                      <img
                        src={floorplanUrl}
                        alt="Property floorplan"
                        className="w-full max-w-md h-48 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={removeFloorplan}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
