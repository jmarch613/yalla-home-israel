
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ImageOff } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface PropertyPhotoViewerProps {
  images: string[];
  title: string;
}

export const PropertyPhotoViewer = ({ images, title }: PropertyPhotoViewerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  const validImages = images.filter((_, index) => !imageErrors.has(index));

  if (validImages.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <ImageOff className="w-16 h-16 mx-auto mb-4" />
          <p className="text-lg">No images available</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  return (
    <div>
      {/* Main image display */}
      <div className="relative">
        <img
          src={validImages[currentImageIndex]}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          className="w-full h-96 object-cover rounded-lg shadow-lg cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
          onError={() => handleImageError(currentImageIndex)}
        />
        
        {validImages.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            {/* Image counter */}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {currentImageIndex + 1} / {validImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {validImages.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {validImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${title} - Thumbnail ${index + 1}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition-all ${
                index === currentImageIndex ? 'border-primary' : 'border-gray-200 hover:border-gray-400'
              }`}
              onClick={() => setCurrentImageIndex(index)}
              onError={() => handleImageError(index)}
            />
          ))}
        </div>
      )}

      {/* Full-size image dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="relative">
            <img
              src={validImages[currentImageIndex]}
              alt={`${title} - Full size`}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setIsDialogOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            
            {validImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
