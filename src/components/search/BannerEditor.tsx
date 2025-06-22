import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GripVertical, Upload, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type BannerSlide = Tables<'banner_slides'>;
type BannerSlideInsert = TablesInsert<'banner_slides'>;

interface BannerSlideForm extends Omit<BannerSlideInsert, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
  title: string;
  subtitle: string;
  image_url: string;
  link_url: string;
  order_index: number;
  is_active: boolean;
}

interface BannerEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSlidesUpdated: () => void;
}

export const BannerEditor = ({ isOpen, onClose, onSlidesUpdated }: BannerEditorProps) => {
  const [slides, setSlides] = useState<BannerSlideForm[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingSlides, setUploadingSlides] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('banner_slides')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching slides:', error);
      } else {
        // Transform the data to match our form structure
        const formSlides: BannerSlideForm[] = (data || []).map(slide => ({
          id: slide.id,
          title: slide.title,
          subtitle: slide.subtitle || '',
          image_url: slide.image_url,
          link_url: slide.link_url || '',
          order_index: slide.order_index,
          is_active: slide.is_active,
        }));
        setSlides(formSlides);
      }
    } catch (error) {
      console.error('Error fetching slides:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSlides();
    }
  }, [isOpen]);

  const uploadImage = async (file: File, slideIndex: number) => {
    try {
      setUploadingSlides(prev => new Set(prev).add(slideIndex));
      
      const fileExt = file.name.split('.').pop();
      const fileName = `banner-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Uploading banner image to bucket:', 'property-images');
      console.log('File path:', filePath);

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      console.log('Generated public URL:', publicUrl);

      // Update the slide with the new image URL
      updateSlide(slideIndex, 'image_url', publicUrl);

      toast({
        title: "Image uploaded",
        description: "Banner image uploaded successfully.",
      });

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload banner image. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploadingSlides(prev => {
        const newSet = new Set(prev);
        newSet.delete(slideIndex);
        return newSet;
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, slideIndex: number) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadImage(file, slideIndex);
    }
  };

  const addSlide = () => {
    const newSlide: BannerSlideForm = {
      title: '',
      subtitle: '',
      image_url: '',
      link_url: '',
      order_index: slides.length,
      is_active: true,
    };
    setSlides([...slides, newSlide]);
  };

  const updateSlide = (index: number, field: keyof BannerSlideForm, value: any) => {
    const updatedSlides = [...slides];
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    setSlides(updatedSlides);
  };

  const removeSlide = (index: number) => {
    const updatedSlides = slides.filter((_, i) => i !== index);
    // Update order indexes
    updatedSlides.forEach((slide, i) => {
      slide.order_index = i;
    });
    setSlides(updatedSlides);
  };

  const saveSlides = async () => {
    setLoading(true);
    try {
      // Delete all existing slides first
      await supabase.from('banner_slides').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      // Insert new slides
      if (slides.length > 0) {
        const slidesToInsert: BannerSlideInsert[] = slides.map(({ id, ...slide }) => ({
          title: slide.title,
          subtitle: slide.subtitle || null,
          image_url: slide.image_url,
          link_url: slide.link_url || null,
          order_index: slide.order_index,
          is_active: slide.is_active,
        }));
        
        const { error } = await supabase
          .from('banner_slides')
          .insert(slidesToInsert);

        if (error) {
          throw error;
        }
      }

      toast({
        title: "Success",
        description: "Banner slides updated successfully",
      });

      onSlidesUpdated();
      onClose();
    } catch (error) {
      console.error('Error saving slides:', error);
      toast({
        title: "Error",
        description: "Failed to save banner slides",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Banner Slides</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {slides.map((slide, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    Slide {index + 1}
                  </div>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeSlide(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`title-${index}`}>Title *</Label>
                    <Input
                      id={`title-${index}`}
                      value={slide.title}
                      onChange={(e) => updateSlide(index, 'title', e.target.value)}
                      placeholder="Banner title"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`subtitle-${index}`}>Subtitle</Label>
                    <Input
                      id={`subtitle-${index}`}
                      value={slide.subtitle}
                      onChange={(e) => updateSlide(index, 'subtitle', e.target.value)}
                      placeholder="Banner subtitle"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Banner Image *</Label>
                  
                  {/* File Upload Section */}
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, index)}
                      className="hidden"
                      id={`file-upload-${index}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById(`file-upload-${index}`)?.click()}
                      disabled={uploadingSlides.has(index)}
                      className="flex items-center gap-2"
                    >
                      {uploadingSlides.has(index) ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload Image
                        </>
                      )}
                    </Button>
                    <span className="text-sm text-gray-500">or</span>
                  </div>

                  {/* URL Input Section */}
                  <div>
                    <Input
                      id={`image-${index}`}
                      value={slide.image_url}
                      onChange={(e) => updateSlide(index, 'image_url', e.target.value)}
                      placeholder="Enter image URL (https://example.com/image.jpg)"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`link-${index}`}>Link URL</Label>
                  <Input
                    id={`link-${index}`}
                    value={slide.link_url}
                    onChange={(e) => updateSlide(index, 'link_url', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id={`active-${index}`}
                    checked={slide.is_active}
                    onCheckedChange={(checked) => updateSlide(index, 'is_active', checked)}
                  />
                  <Label htmlFor={`active-${index}`}>Active</Label>
                </div>

                {slide.image_url && (
                  <div className="mt-2">
                    <Label>Preview:</Label>
                    <div className="relative h-24 w-full bg-gray-100 rounded overflow-hidden mt-1">
                      <img
                        src={slide.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={addSlide}
            variant="outline"
            className="w-full border-dashed"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Slide
          </Button>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={saveSlides} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
