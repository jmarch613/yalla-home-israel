
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
import { useLanguage } from '@/contexts/LanguageContext';

export const MyPropertiesTable = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
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
        <CardTitle>{t('my.properties.your.listings')} ({properties.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('my.properties.title')}</TableHead>
              <TableHead>{t('my.properties.type')}</TableHead>
              <TableHead>{t('my.properties.price')}</TableHead>
              <TableHead>{t('my.properties.status')}</TableHead>
              <TableHead>{t('my.properties.location')}</TableHead>
              <TableHead>{t('my.properties.created')}</TableHead>
              <TableHead>{t('my.properties.actions')}</TableHead>
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
