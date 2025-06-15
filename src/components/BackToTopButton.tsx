
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-gray-200 hover:bg-gray-300 text-gray-600 shadow-lg rounded-lg p-3 transition-all duration-200"
      size="icon"
      variant="ghost"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};
