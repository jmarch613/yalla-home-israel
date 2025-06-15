
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bed, Bath, Square } from 'lucide-react';

interface PropertyStatsSectionProps {
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
}

export const PropertyStatsSection = ({ bedrooms, bathrooms, area }: PropertyStatsSectionProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 text-center">
          <Bed className="w-6 h-6 mx-auto mb-2 text-gray-600" />
          <div className="text-xl font-semibold">{bedrooms || 0}</div>
          <div className="text-sm text-gray-600">
            {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Bath className="w-6 h-6 mx-auto mb-2 text-gray-600" />
          <div className="text-xl font-semibold">{bathrooms || 0}</div>
          <div className="text-sm text-gray-600">
            {bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Square className="w-6 h-6 mx-auto mb-2 text-gray-600" />
          <div className="text-xl font-semibold">{area || 0}</div>
          <div className="text-sm text-gray-600">m²</div>
        </CardContent>
      </Card>
    </div>
  );
};
