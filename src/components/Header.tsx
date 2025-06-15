
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, User, Menu, LogOut, List } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { CurrencySelector } from '@/components/CurrencySelector';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const Header = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (user: any) => {
    const firstName = user?.user_metadata?.first_name || '';
    const lastName = user?.user_metadata?.last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <span className="text-xl font-bold text-primary">Yalla Home</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-primary font-medium">Buy</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium">Rent</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium">House Prices</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <Heart className="w-4 h-4 mr-2" />
                  Saved
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden md:flex"
                  onClick={() => navigate('/my-properties')}
                >
                  <List className="w-4 h-4 mr-2" />
                  My Properties
                </Button>
              </>
            )}
            
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:flex">
                      <Avatar className="w-6 h-6 mr-2">
                        <AvatarFallback className="text-xs">
                          {getInitials(user)}
                        </AvatarFallback>
                      </Avatar>
                      Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden md:flex"
                  onClick={() => navigate('/auth')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign in
                </Button>
              )
            )}
            
            <CurrencySelector />
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/list-property')}
            >
              List Property
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
