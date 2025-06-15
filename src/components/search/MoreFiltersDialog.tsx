
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface MoreFiltersDialogProps {
  features: {
    parking: boolean;
    balcony: boolean;
    elevator: boolean;
    garden: boolean;
    safeRoom: boolean;
    bombShelter: boolean;
  };
  onApply: (features: any) => void;
}

const filterOptions = [
  { key: 'parking', label: 'Parking' },
  { key: 'balcony', label: 'Balcony' },
  { key: 'safeRoom', label: 'Safe Room' },
  { key: 'bombShelter', label: 'Bomb Shelter' },
  { key: 'elevator', label: 'Elevator' },
  { key: 'garden', label: 'Garden' },
];

export const MoreFiltersDialog = ({ features, onApply }: MoreFiltersDialogProps) => {
  const [selectedFeatures, setSelectedFeatures] = useState(features);

  const handleFeatureChange = (key: string, checked: boolean) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleClearAll = () => {
    const clearedFeatures = {
      parking: false,
      balcony: false,
      elevator: false,
      garden: false,
      safeRoom: false,
      bombShelter: false,
    };
    setSelectedFeatures(clearedFeatures);
  };

  const handleApply = () => {
    onApply(selectedFeatures);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Property features</h3>
        <div className="grid grid-cols-2 gap-4">
          {filterOptions.map((option) => (
            <div key={option.key} className="flex items-center space-x-2">
              <Checkbox 
                id={option.key}
                checked={selectedFeatures[option.key as keyof typeof selectedFeatures]}
                onCheckedChange={(checked) => handleFeatureChange(option.key, checked as boolean)}
              />
              <Label htmlFor={option.key} className="text-sm font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={handleClearAll}
          className="flex-1"
        >
          Clear all
        </Button>
        <Button 
          onClick={handleApply}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          Show properties
        </Button>
      </div>
    </div>
  );
};
