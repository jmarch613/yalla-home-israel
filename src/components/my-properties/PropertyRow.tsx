
import React from 'react';
import { PropertyListing } from '@/types/database';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PropertyActions } from './PropertyActions';
import { StatusUpdateDropdown } from './StatusUpdateDropdown';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocationTranslation } from '@/utils/locationTranslations';

interface PropertyRowProps {
  property: PropertyListing;
  onDelete: (propertyId: string) => void;
  onStatusUpdate: (propertyId: string, newStatus: string) => void;
}

export const PropertyRow = ({ property, onDelete, onStatusUpdate }: PropertyRowProps) => {
  const { t } = useLanguage();
  const { translateLocation } = useLocationTranslation();

  const getStatusColor = (status: string) => {
    const statusColors = {
      approved: 'bg-green-100 text-green-800',
      published: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      under_offer: 'bg-blue-100 text-blue-800',
      sold: 'bg-purple-100 text-purple-800',
      withdrawn: 'bg-gray-100 text-gray-800',
      price_reduced: 'bg-orange-100 text-orange-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const formatStatus = (status: string) => {
    return t(`status.${status}`);
  };

  const formatPrice = (price: number | null) => {
    if (!price) return t('my.properties.price.on.request');
    return `₪${price.toLocaleString()}`;
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        {property.title}
      </TableCell>
      <TableCell>
        <span className="capitalize">{t(`property.type.${property.property_type}`)}</span>
        <span className="text-gray-500 ml-2">({t(`nav.${property.listing_type}`)})</span>
      </TableCell>
      <TableCell>
        {formatPrice(property.price)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(property.status || 'pending')}>
            {formatStatus(property.status || 'pending')}
          </Badge>
          <StatusUpdateDropdown 
            currentStatus={property.status || 'pending'}
            onStatusChange={(newStatus) => onStatusUpdate(property.id, newStatus)}
          />
        </div>
      </TableCell>
      <TableCell>
        {translateLocation(property.city, property.neighborhood)}
      </TableCell>
      <TableCell>
        {new Date(property.created_at).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <PropertyActions property={property} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};
