
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatusUpdateDropdownProps {
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
}

export const StatusUpdateDropdown = ({ currentStatus, onStatusChange }: StatusUpdateDropdownProps) => {
  const { t } = useLanguage();

  const statusOptions = [
    { value: 'approved', label: t('status.approved') },
    { value: 'published', label: t('status.published') },
    { value: 'under_offer', label: t('status.under_offer') },
    { value: 'sold', label: t('status.sold') },
    { value: 'withdrawn', label: t('status.withdrawn') },
    { value: 'price_reduced', label: t('status.price_reduced') },
    { value: 'pending', label: t('status.pending') },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className={currentStatus === option.value ? 'font-semibold' : ''}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
