
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface PropertyDescriptionSectionProps {
  description: string | null;
  transformText: (text: string) => string;
}

export const PropertyDescriptionSection = ({ description, transformText }: PropertyDescriptionSectionProps) => {
  const { t } = useLanguage();

  if (!description) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">{t('details.description')}</h3>
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-700 leading-relaxed">
            {transformText(description)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
