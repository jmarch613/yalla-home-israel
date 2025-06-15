
import React, { useState } from 'react';
import { Control, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Image, X } from 'lucide-react';
import { PropertyFormData } from './PropertyFormSchema';
import { useImageUpload } from './hooks/useImageUpload';

interface FloorplanUploadProps {
  control: Control<PropertyFormData>;
}

export const FloorplanUpload = ({ control }: FloorplanUploadProps) => {
  const { setValue, watch } = useFormContext<PropertyFormData>();
  const [uploadingFloorplan, setUploadingFloorplan] = useState(false);
  const { uploadImage } = useImageUpload();

  const floorplanUrl = watch('floorplan_url');

  const handleFloorplanUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFloorplan(true);
    
    try {
      const uploadedUrl = await uploadImage(file, true);
      if (uploadedUrl) {
        setValue('floorplan_url', uploadedUrl);
      }
    } finally {
      setUploadingFloorplan(false);
      // Reset input
      event.target.value = '';
    }
  };

  const removeFloorplan = () => {
    setValue('floorplan_url', undefined);
  };

  return (
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
  );
};
