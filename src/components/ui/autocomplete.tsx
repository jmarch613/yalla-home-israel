
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  suggestions: string[];
  className?: string;
}

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ value, onChange, onKeyPress, placeholder, suggestions, className }, ref) => {
    const [open, setOpen] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (value.trim().length > 0) {
        const filtered = suggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 8); // Limit to 8 suggestions
        setFilteredSuggestions(filtered);
      } else {
        setFilteredSuggestions([]);
      }
    }, [value, suggestions]);

    const handleSelect = (suggestion: string) => {
      onChange(suggestion);
      setOpen(false);
      inputRef.current?.blur();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      if (!open && e.target.value.trim().length > 0) {
        setOpen(true);
      }
      if (e.target.value.trim().length === 0) {
        setOpen(false);
      }
    };

    const handleInputFocus = () => {
      if (value.trim().length > 0) {
        setOpen(true);
      }
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400 z-10" />
            <Input
              ref={inputRef}
              value={value}
              onChange={handleInputChange}
              onKeyPress={onKeyPress}
              onFocus={handleInputFocus}
              placeholder={placeholder}
              className={cn("pl-10", className)}
              autoComplete="off"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandList>
              {filteredSuggestions.length === 0 ? (
                <CommandEmpty>No locations found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredSuggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion}
                      onSelect={() => handleSelect(suggestion)}
                      className="cursor-pointer"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {suggestion}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Autocomplete.displayName = 'Autocomplete';
