
import React from 'react';
import { PropertyListing } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PropertyActionsProps {
  property: PropertyListing;
  onDelete: (propertyId: string) => void;
}

export const PropertyActions = ({ property, onDelete }: PropertyActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(`/property/${property.id}`)}
      >
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(`/property/${property.id}/photos`)}
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(property.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
