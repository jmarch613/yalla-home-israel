
import { NavigateFunction, Location } from 'react-router-dom';
import { PropertyDetailsType } from '@/hooks/usePropertyDetails';

export const handleBackNavigation = (
  navigate: NavigateFunction,
  location: Location,
  property: PropertyDetailsType | undefined
) => {
  console.log('Back button clicked');
  console.log('Location state:', location.state);
  console.log('Current pathname:', location.pathname);
  console.log('Document referrer:', document.referrer);
  
  // Check if we have search params to return to search page
  if (location.state?.searchParams) {
    console.log('Navigating back to search with params:', location.state.searchParams);
    navigate(`/search${location.state.searchParams}`, { 
      state: { restoreScrollPosition: location.state.scrollPosition } 
    });
  } 
  // Check if we have a specific source in the location state
  else if (location.state?.from === 'my-properties') {
    console.log('Navigating back to my-properties from state');
    navigate('/my-properties');
  }
  // Check if referrer suggests we came from my-properties
  else if (document.referrer && document.referrer.includes('/my-properties')) {
    console.log('Navigating back to my-properties from referrer');
    navigate('/my-properties');
  }
  // For user properties (properties with user_id), default to my-properties
  else if (property && 'user_id' in property) {
    console.log('User property detected, navigating to my-properties');
    navigate('/my-properties');
  }
  // Check if referrer suggests we came from search
  else if (document.referrer && document.referrer.includes('/search')) {
    console.log('Navigating back to search');
    navigate('/search');
  }
  // Default fallback - go to home page
  else {
    console.log('No specific referrer found, navigating to home');
    navigate('/');
  }
};

export const getBackButtonText = (
  location: Location,
  property: PropertyDetailsType | undefined
): string => {
  if (location.state?.searchParams) {
    return 'Back to Search';
  }
  if (location.state?.from === 'my-properties') {
    return 'Back to My Properties';
  }
  if (document.referrer && document.referrer.includes('/my-properties')) {
    return 'Back to My Properties';
  }
  if (property && 'user_id' in property) {
    return 'Back to My Properties';
  }
  if (document.referrer && document.referrer.includes('/search')) {
    return 'Back to Search';
  }
  return 'Back to Home';
};
