
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PropertyDescriptionSectionProps {
  description: string | null;
  transformText: (text: string) => string;
}

export const PropertyDescriptionSection = ({ description, transformText }: PropertyDescriptionSectionProps) => {
  if (!description) return null;

  // Split description into paragraphs and filter out empty ones
  const paragraphs = transformText(description)
    .split('\n')
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Description</h3>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
