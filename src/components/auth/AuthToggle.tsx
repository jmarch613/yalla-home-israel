
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthToggleProps {
  isLogin: boolean;
  toggleMode: () => void;
  loading: boolean;
}

export const AuthToggle: React.FC<AuthToggleProps> = ({
  isLogin,
  toggleMode,
  loading
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={toggleMode}
          disabled={loading}
          className="text-sm text-primary hover:underline disabled:opacity-50"
        >
          {isLogin 
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"
          }
        </button>
      </div>
      
      <div className="mt-4 text-center">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          disabled={loading}
          className="text-sm"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    </>
  );
};
