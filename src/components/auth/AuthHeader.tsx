
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthHeaderProps {
  isLogin: boolean;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ isLogin }) => {
  const navigate = useNavigate();

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex justify-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">Y</span>
          </div>
          <span className="text-xl font-bold text-primary">Yalla Home</span>
        </div>
      </div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        {isLogin ? 'Sign in to your account' : 'Create your account'}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Find your perfect home in Jerusalem
      </p>
    </div>
  );
};
