
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const AuthRequiredCard = () => {
  const navigate = useNavigate();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In Required</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          You need to sign in to list a property.
        </p>
        <Button onClick={() => navigate('/auth')} className="w-full">
          Sign In
        </Button>
      </CardContent>
    </Card>
  );
};
