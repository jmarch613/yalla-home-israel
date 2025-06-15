
import React from 'react';
import { Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyGridEmptyStateProps {
  hasAnyProperties: boolean;
  onScrape: () => void;
}

export const PropertyGridEmptyState = ({ hasAnyProperties, onScrape }: PropertyGridEmptyStateProps) => (
  <div className="text-center py-12 bg-white rounded-lg border">
    <Database className="w-12 h-12 mx-auto mb-4 text-gray-400" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      {hasAnyProperties ? 'No properties match your filters' : 'No properties found'}
    </h3>
    <p className="text-gray-600 mb-4">
      {hasAnyProperties
        ? 'Try adjusting your search filters to see more results'
        : 'Click "Update Data" to scrape the latest properties from remaxjerusalem.com'}
    </p>
    {!hasAnyProperties && (
      <Button onClick={onScrape}>
        <Database className="w-4 h-4 mr-2" />
        Scrape Properties
      </Button>
    )}
  </div>
);
