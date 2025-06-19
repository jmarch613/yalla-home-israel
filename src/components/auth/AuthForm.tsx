
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { AuthFormFields } from './AuthFormFields';
import { AuthToggle } from './AuthToggle';
import { ForgotPasswordForm } from './ForgotPasswordForm';

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

  // Show forgot password form if requested
  if (showForgotPassword) {
    return (
      <ForgotPasswordForm 
        onBackToLogin={() => setShowForgotPassword(false)} 
      />
    );
  }

  const validateForm = () => {
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Email and password are required.",
        variant: "destructive"
      });
      return false;
    }

    if (!isLogin && (!firstName || !lastName)) {
      toast({
        title: "Validation Error",
        description: "First name and last name are required for sign up.",
        variant: "destructive"
      });
      return false;
    }

    if (password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Login failed",
              description: "Invalid email or password. Please check your credentials and try again.",
              variant: "destructive"
            });
          } else if (error.message.includes('Email not confirmed')) {
            toast({
              title: "Email not confirmed",
              description: "Please check your email and click the confirmation link before signing in.",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Login failed",
              description: error.message,
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in."
          });
        }
      } else {
        const { error } = await signUp(email, password, firstName, lastName);
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: "Account exists",
              description: "An account with this email already exists. Please sign in instead.",
              variant: "destructive"
            });
            setIsLogin(true);
          } else if (error.message.includes('Password should be at least')) {
            toast({
              title: "Password too weak",
              description: "Password should be at least 6 characters long.",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Sign up failed",
              description: error.message,
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Account created successfully!",
            description: "Please check your email to verify your account before signing in."
          });
          setIsLogin(true);
          setPassword('');
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
