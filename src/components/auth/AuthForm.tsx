
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { AuthFormFields } from './AuthFormFields';
import { AuthToggle } from './AuthToggle';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { validateAuthForm } from './AuthValidation';
import { handleAuthError, handleAuthSuccess } from './AuthErrorHandler';

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin, setIsLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const { signIn, signUp } = useAuth();

  if (showForgotPassword) {
    return (
      <ForgotPasswordForm 
        onBackToLogin={() => setShowForgotPassword(false)} 
      />
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAuthForm({ email, password, firstName, lastName, isLogin })) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          handleAuthError(error, isLogin, setIsLogin, setPassword);
        } else {
          handleAuthSuccess(isLogin, setIsLogin, setPassword);
        }
      } else {
        const { error } = await signUp(email, password, firstName, lastName);
        if (error) {
          handleAuthError(error, isLogin, setIsLogin, setPassword);
        } else {
          handleAuthSuccess(isLogin, setIsLogin, setPassword);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isLogin ? 'Sign In' : 'Sign Up'}</CardTitle>
        <CardDescription>
          {isLogin 
            ? 'Enter your email and password to access your account'
            : 'Create an account to start browsing properties'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthFormFields
            isLogin={isLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            loading={loading}
          />
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              isLogin ? 'Sign In' : 'Sign Up'
            )}
          </Button>
        </form>
        
        {isLogin && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              disabled={loading}
              className="text-sm text-primary hover:underline disabled:opacity-50"
            >
              Forgot your password?
            </button>
          </div>
        )}
        
        <AuthToggle
          isLogin={isLogin}
          toggleMode={toggleMode}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};
