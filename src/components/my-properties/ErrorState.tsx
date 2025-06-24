
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{t('my.properties.error.loading')}</p>
          <Button onClick={onRetry} variant="outline">
            {t('common.try.again')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
