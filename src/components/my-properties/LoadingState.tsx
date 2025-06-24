
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export const LoadingState = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin mx-auto mb-4 text-gray-500">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12A8 8 0 0 1 20 12"
                />
              </svg>
            </div>
            <p className="text-gray-600">{t('my.properties.loading')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
