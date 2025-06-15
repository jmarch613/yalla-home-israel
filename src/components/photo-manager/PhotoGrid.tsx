
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PhotoItem } from './PhotoItem';

interface PhotoGridProps {
  images: string[];
  onReorderImages: (draggedIndex: number, dropIndex: number) => void;
  onRemoveImage: (index: number) => void;
  onSaveOrder: () => void;
  saving: boolean;
}

export const PhotoGrid = ({
  images,
  onReorderImages,
  onRemoveImage,
  onSaveOrder,
  saving
}: PhotoGridProps) => {
  const navigate = useNavigate();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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

    onReorderImages(draggedIndex, dropIndex);
    setDraggedIndex(null);
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No photos uploaded yet.</p>
        <Button 
          className="mt-4" 
          onClick={() => navigate(`/list-property`)}
        >
          Upload Photos
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {images.map((imageUrl, index) => (
          <PhotoItem
            key={`${imageUrl}-${index}`}
            imageUrl={imageUrl}
            index={index}
            isMainPhoto={index === 0}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onRemove={onRemoveImage}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onSaveOrder}
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
  );
};
