
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export const EmptyPropertiesState = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven't listed any properties yet.</p>
          <Button onClick={() => navigate('/list-property')}>
            List Your First Property
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
