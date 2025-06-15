
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Features {
  parking: boolean;
  balcony: boolean;
  elevator: boolean;
  garden: boolean;
}

interface FeaturesFilterProps {
  features: Features;
  onFeatureChange: (feature: string, checked: boolean) => void;
}

export const FeaturesFilter = ({ 
  features, 
  onFeatureChange 
}: FeaturesFilterProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Features</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="parking" 
            checked={features.parking}
            onCheckedChange={(checked) => onFeatureChange('parking', checked as boolean)}
          />
          <Label htmlFor="parking" className="text-sm">Parking</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="balcony" 
            checked={features.balcony}
            onCheckedChange={(checked) => onFeatureChange('balcony', checked as boolean)}
          />
          <Label htmlFor="balcony" className="text-sm">Balcony</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="elevator" 
            checked={features.elevator}
            onCheckedChange={(checked) => onFeatureChange('elevator', checked as boolean)}
          />
          <Label htmlFor="elevator" className="text-sm">Elevator</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="garden" 
            checked={features.garden}
            onCheckedChange={(checked) => onFeatureChange('garden', checked as boolean)}
          />
          <Label htmlFor="garden" className="text-sm">Garden</Label>
        </div>
      </CardContent>
    </Card>
  );
};
