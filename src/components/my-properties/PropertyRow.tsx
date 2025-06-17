
import React from 'react';
import { PropertyListing } from '@/types/database';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PropertyActions } from './PropertyActions';
import { StatusUpdateDropdown } from './StatusUpdateDropdown';

interface PropertyRowProps {
  property: PropertyListing;
  onDelete: (propertyId: string) => void;
  onStatusUpdate: (propertyId: string, newStatus: string) => void;
}

export const PropertyRow = ({ property, onDelete, onStatusUpdate }: PropertyRowProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_offer':
        return 'bg-blue-100 text-blue-800';
      case 'sold':
        return 'bg-purple-100 text-purple-800';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-800';
      case 'price_reduced':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
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
