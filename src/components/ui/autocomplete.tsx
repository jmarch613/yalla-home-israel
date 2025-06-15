
import React, { useState, useRef, useEffect, useCallback } from 'react';
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

    // Debounced filtering function
    const debouncedFilter = useCallback(
      (() => {
        let timeoutId: NodeJS.Timeout;
        return (searchValue: string) => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            if (searchValue.trim().length >= 2) {
              const filtered = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(searchValue.toLowerCase())
              ).slice(0, 6); // Reduced to 6 suggestions for cleaner UI
              setFilteredSuggestions(filtered);
            } else {
              setFilteredSuggestions([]);
            }
          }, 150); // 150ms debounce
        };
      })(),
      [suggestions]
    );

    useEffect(() => {
      debouncedFilter(value);
    }, [value, debouncedFilter]);

    const handleSelect = (suggestion: string) => {
      onChange(suggestion);
      setOpen(false);
      inputRef.current?.blur();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);
      
      // Only open if we have enough characters and suggestions
      if (newValue.trim().length >= 2) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    const handleInputFocus = () => {
      // Only open if we already have enough text
      if (value.trim().length >= 2 && filteredSuggestions.length > 0) {
        setOpen(true);
      }
    };

    const handleInputBlur = () => {
      // Delay closing to allow for selection
      setTimeout(() => {
        setOpen(false);
      }, 200);
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
              onBlur={handleInputBlur}
              placeholder={placeholder}
              className={cn("pl-10", className)}
              autoComplete="off"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border shadow-lg"
          align="start"
          sideOffset={4}
        >
          <Command>
            <CommandList>
              {filteredSuggestions.length === 0 ? (
                <CommandEmpty className="py-3 text-sm text-gray-500">
                  {value.trim().length < 2 ? 'Type at least 2 characters to search' : 'No locations found.'}
                </CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredSuggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion}
                      onSelect={() => handleSelect(suggestion)}
                      className="cursor-pointer hover:bg-gray-50 px-3 py-2"
                    >
                      <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm">{suggestion}</span>
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
