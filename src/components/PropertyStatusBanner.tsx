
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PropertyStatusBannerProps {
  status: string;
}

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'under_offer':
      return { text: 'Under Offer', className: 'bg-orange-500 text-white' };
    case 'sold':
      return { text: 'Sold', className: 'bg-red-500 text-white' };
    case 'withdrawn':
      return { text: 'Withdrawn', className: 'bg-gray-500 text-white' };
    case 'price_reduced':
      return { text: 'Price Reduced', className: 'bg-green-500 text-white' };
    default:
      return null;
  }
};

export const PropertyStatusBanner = ({ status }: PropertyStatusBannerProps) => {
  const statusInfo = getStatusInfo(status);
  
  if (!statusInfo) return null;

  return (
    <div className="absolute top-2 right-2 z-10">
      <div 
        className={`${statusInfo.className} px-3 py-1 text-xs font-bold transform rotate-12 shadow-lg`}
        style={{
          transformOrigin: 'center',
          transform: 'rotate(12deg)',
        }}
      >
        {statusInfo.text}
      </div>
    </div>
  );
};
