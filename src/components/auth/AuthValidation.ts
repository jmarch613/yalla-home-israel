
import { toast } from '@/hooks/use-toast';

interface ValidationParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  isLogin: boolean;
}

export const validateAuthForm = ({ email, password, firstName, lastName, isLogin }: ValidationParams): boolean => {
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
