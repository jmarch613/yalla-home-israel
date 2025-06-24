
import React from 'react';
import { PropertyListing } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface PropertyActionsProps {
  property: PropertyListing;
  onDelete: (propertyId: string) => void;
}

export const PropertyActions = ({ property, onDelete }: PropertyActionsProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(`/property/${property.id}`)}
        title={t('my.properties.view.property')}
      >
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(`/edit-property/${property.id}`)}
        title={t('my.properties.edit.property')}
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(property.id)}
        title={t('my.properties.delete.property')}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
