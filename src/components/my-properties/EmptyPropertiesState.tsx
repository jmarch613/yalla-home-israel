
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export const EmptyPropertiesState = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">{t('my.properties.empty.message')}</p>
          <Button onClick={() => navigate('/list-property')}>
            {t('my.properties.list.first')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
