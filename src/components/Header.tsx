
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, User, Menu } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <span className="text-xl font-bold text-primary">Yalla Home</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-primary font-medium">Buy</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium">Rent</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium">New Builds</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium">Commercial</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium">House Prices</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Heart className="w-4 h-4 mr-2" />
              Saved
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="w-4 h-4 mr-2" />
              Sign in
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
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
