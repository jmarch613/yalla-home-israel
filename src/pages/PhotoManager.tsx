import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, GripVertical, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { PropertyListing } from '@/types/database';

const PhotoManager = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<PropertyListing | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!user || !id) {
      navigate('/auth');
      return;
    }
    fetchProperty();
  }, [user, id, navigate]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      if (!data) {
        toast({
          title: "Property not found",
          description: "The property you're looking for doesn't exist or you don't have permission to view it.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      // Properly map the database result to PropertyListing type
      const propertyData: PropertyListing = {
        ...data,
        property_type: data.property_type as PropertyListing['property_type'],
        listing_type: data.listing_type as PropertyListing['listing_type'],
        floorplan_url: null // Set default value since it's not in the database yet
      };

      setProperty(propertyData);
      setImages(data.images || []);
    } catch (error) {
      console.error('Error fetching property:', error);
      toast({
        title: "Error",
        description: "Failed to load property data.",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    
    newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    
    setImages(newImages);
    setDraggedIndex(null);
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
  };

  const saveImageOrder = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('property_listings')
        .update({ images })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Photo order has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving image order:', error);
      toast({
        title: "Error",
        description: "Failed to save photo order.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">Property not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Manage Photos</h1>
              <p className="text-muted-foreground">{property.title}</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Property Photos</CardTitle>
              <p className="text-sm text-muted-foreground">
                Drag and drop photos to reorder them. The first photo will be used as the main image.
              </p>
            </CardHeader>
            <CardContent>
              {images.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No photos uploaded yet.</p>
                  <Button 
                    className="mt-4" 
                    onClick={() => navigate(`/list-property`)}
                  >
                    Upload Photos
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {images.map((imageUrl, index) => (
                      <div
                        key={`${imageUrl}-${index}`}
                        className="relative group cursor-move bg-white border-2 border-dashed border-gray-200 rounded-lg p-2 hover:border-primary transition-colors"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        <div className="absolute top-2 left-2 z-10">
                          <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                            {index + 1}
                          </div>
                        </div>
                        
                        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeImage(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <GripVertical className="h-5 w-5 text-gray-500" />
                        </div>

                        <img
                          src={imageUrl}
                          alt={`Property photo ${index + 1}`}
                          className="w-full h-40 object-cover rounded-md"
                        />
                        
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 z-10">
                            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                              Main Photo
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={saveImageOrder}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Order'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/list-property`)}
                    >
                      Add More Photos
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhotoManager;
