
import React from 'react';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2 } from 'lucide-react';

interface PhotoItemProps {
  imageUrl: string;
  index: number;
  isMainPhoto: boolean;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onRemove: (index: number) => void;
}

export const PhotoItem = ({
  imageUrl,
  index,
  isMainPhoto,
  onDragStart,
  onDragOver,
  onDrop,
  onRemove
}: PhotoItemProps) => {
  return (
    <div
      className="relative group cursor-move bg-white border-2 border-dashed border-gray-200 rounded-lg p-2 hover:border-primary transition-colors"
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
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
          onClick={() => onRemove(index)}
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
      
      {isMainPhoto && (
        <div className="absolute bottom-2 left-2 z-10">
          <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
            Main Photo
          </div>
        </div>
      )}
    </div>
  );
};
