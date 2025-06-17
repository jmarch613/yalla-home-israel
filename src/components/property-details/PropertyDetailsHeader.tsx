
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PropertyDetailsHeaderProps {
  onBackClick: () => void;
  backButtonText: string;
}

export const PropertyDetailsHeader = ({ onBackClick, backButtonText }: PropertyDetailsHeaderProps) => {
  return (
    <div className="mb-6">
      <Button
        variant="outline"
        onClick={onBackClick}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {backButtonText}
      </Button>
    </div>
  );
};
