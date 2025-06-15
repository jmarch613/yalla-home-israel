
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Failed to load your properties</p>
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
