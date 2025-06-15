
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { usePhotoManager } from '@/hooks/usePhotoManager';
import { PhotoGrid } from '@/components/photo-manager/PhotoGrid';

const PhotoManager = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    property,
    images,
    loading,
    saving,
    reorderImages,
    removeImage,
    saveImageOrder
  } = usePhotoManager(id!);

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
              <PhotoGrid
                images={images}
                onReorderImages={reorderImages}
                onRemoveImage={removeImage}
                onSaveOrder={saveImageOrder}
                saving={saving}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhotoManager;
