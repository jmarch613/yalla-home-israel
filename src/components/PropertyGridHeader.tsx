
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Database } from 'lucide-react';

interface PropertyGridHeaderProps {
  filteredCount: number;
  totalCount: number;
  onUpdateData: () => void;
  sort: string;
  onSortChange: (newSort: string) => void;
}

export const PropertyGridHeader = ({
  filteredCount,
  totalCount,
  onUpdateData,
  sort,
  onSortChange
}: PropertyGridHeaderProps) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-4">
      <p className="text-gray-700 font-medium">
        {filteredCount} properties
        {filteredCount !== totalCount && (
          <span className="text-sm font-normal text-gray-500 ml-2">
            (filtered from {totalCount} total)
          </span>
        )}
      </p>
      <Button
        onClick={onUpdateData}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Database className="w-4 h-4" />
        Update Data
      </Button>
    </div>
    <select
      className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
      value={sort}
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="most-recent">Sort by: Most Recent</option>
      <option value="price-low-high">Price: Low to High</option>
      <option value="price-high-low" disabled>Price: High to Low</option>
      <option value="size-largest" disabled>Size: Largest First</option>
    </select>
  </div>
);
