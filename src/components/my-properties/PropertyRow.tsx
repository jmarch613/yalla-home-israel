
import React from 'react';
import { PropertyListing } from '@/types/database';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PropertyActions } from './PropertyActions';

interface PropertyRowProps {
  property: PropertyListing;
  onDelete: (propertyId: string) => void;
}

export const PropertyRow = ({ property, onDelete }: PropertyRowProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        {property.title}
      </TableCell>
      <TableCell>
        <span className="capitalize">{property.property_type}</span>
        <span className="text-gray-500 ml-2">({property.listing_type})</span>
      </TableCell>
      <TableCell>
        {property.price ? `₪${property.price.toLocaleString()}` : 'Price on request'}
      </TableCell>
      <TableCell>
        <Badge className={getStatusColor(property.status || 'pending')}>
          {property.status || 'pending'}
        </Badge>
      </TableCell>
      <TableCell>
        {property.city}{property.neighborhood && `, ${property.neighborhood}`}
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
