
import { toast } from '@/hooks/use-toast';

export const handleAuthError = (error: any, isLogin: boolean, setIsLogin: (value: boolean) => void, setPassword: (value: string) => void) => {
  if (isLogin) {
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
  }
};

export const handleAuthSuccess = (isLogin: boolean, setIsLogin: (value: boolean) => void, setPassword: (value: string) => void) => {
  if (isLogin) {
    toast({
      title: "Welcome back!",
      description: "You have successfully signed in."
    });
  } else {
    toast({
      title: "Account created successfully!",
      description: "Please check your email to verify your account before signing in."
    });
    setIsLogin(true);
    setPassword('');
  }
};
