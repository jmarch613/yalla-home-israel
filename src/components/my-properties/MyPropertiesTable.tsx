
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMyProperties } from '@/hooks/useMyProperties';
import { PropertyRow } from './PropertyRow';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { EmptyPropertiesState } from './EmptyPropertiesState';

export const MyPropertiesTable = () => {
  const { user } = useAuth();
  const { properties, isLoading, error, refetch, handleDelete, handleStatusUpdate } = useMyProperties();

  if (!user) {
    return null;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  if (!properties || properties.length === 0) {
    return <EmptyPropertiesState />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Property Listings ({properties.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <PropertyRow
                key={property.id}
                property={property}
                onDelete={handleDelete}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
