
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X, Eye } from 'lucide-react';
import { PropertyFormData } from './PropertyFormSchema';
import { useImageUpload } from './hooks/useImageUpload';
import { usePhotoAnalysis } from './hooks/usePhotoAnalysis';
import { PhotoAnalysisDisplay } from './PhotoAnalysisDisplay';

export const PropertyImagesUpload = () => {
  const { setValue, watch } = useFormContext<PropertyFormData>();
  const [uploading, setUploading] = useState(false);
  const { uploadImage } = useImageUpload();
  const { isAnalyzing, analysis, analyzePhotos } = usePhotoAnalysis();

  const images = watch('images') || [];

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
      }
    } finally {
      setUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setValue('images', updatedImages);
  };

  const handleAnalyzePhotos = () => {
    analyzePhotos(images);
  };

  return (
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
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
            
            {/* AI Analysis Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleAnalyzePhotos}
              disabled={isAnalyzing || images.length === 0}
              className="w-full"
            >
              <Eye className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analyzing Photos...' : 'Analyze Property Condition with AI'}
            </Button>
          </div>
        )}

        {/* Display Analysis Results */}
        {analysis && (
          <div className="mt-6">
            <PhotoAnalysisDisplay analysis={analysis} />
          </div>
        )}
      </div>
    </div>
  );
};
