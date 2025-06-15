
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Database } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
}: PropertyGridHeaderProps) => {
  const { t } = useLanguage();

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <p className="text-gray-700 font-medium">
            {filteredCount} {t('grid.properties')}
            {filteredCount !== totalCount && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({t('grid.filtered')} {totalCount} {t('grid.total')})
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
            {t('grid.update')}
          </Button>
        </div>
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="most-recent">{t('grid.sort.recent')}</option>
          <option value="price-low-high">{t('grid.sort.price.low')}</option>
          <option value="price-high-low">{t('grid.sort.price.high')}</option>
          <option value="size-largest">{t('grid.sort.size')}</option>
        </select>
      </div>
    </div>
  );
};
