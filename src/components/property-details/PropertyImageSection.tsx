
import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface PropertyImageSectionProps {
  imageUrl: string | null;
  title: string | null;
}

export const PropertyImageSection = ({ imageUrl, title }: PropertyImageSectionProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.log('Property detail image failed to load');
    setImageError(true);
  };

  return (
    <div>
      {!imageError && imageUrl ? (
        <img
          src={imageUrl}
          alt={title || 'Property'}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
          onError={handleImageError}
          onLoad={() => console.log('Property detail image loaded successfully')}
        />
      ) : (
        <div className="w-full h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <ImageOff className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg">Image not available</p>
          </div>
        </div>
      )}
    </div>
  );
};
