
import React, { useState, useRef } from "react";
import { DollarSign, Euro, PoundSterling } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrency, Currency } from "@/contexts/CurrencyContext";

interface CurrencyOption {
  code: Currency;
  label: string;
  icon: React.ReactNode;
  symbol: string;
}

const options: CurrencyOption[] = [
  {
    code: "ILS",
    label: "Israeli Shekel",
    icon: <span className="text-lg font-bold">₪</span>,
    symbol: "₪"
  },
  {
    code: "USD",
    label: "US Dollar",
    icon: <DollarSign className="w-4 h-4" />,
    symbol: "$"
  },
  {
    code: "EUR",
    label: "Euro",
    icon: <Euro className="w-4 h-4" />,
    symbol: "€"
  },
  {
    code: "GBP",
    label: "Pound Sterling",
    icon: <PoundSterling className="w-4 h-4" />,
    symbol: "£"
  },
];

export const CurrencySelector = () => {
  const [open, setOpen] = useState(false);
  const { selectedCurrency, setSelectedCurrency, getCurrencySymbol } = useCurrency();
  const containerRef = useRef<HTMLDivElement|null>(null);

  const currentOption = options.find(opt => opt.code === selectedCurrency) || options[0];

  // Close on outside click
  React.useEffect(() => {
    function handle(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, [open]);

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    setOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 px-3 py-2 min-w-[44px] border-gray-300"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center justify-center text-lg">{getCurrencySymbol(selectedCurrency)}</span>
        <svg className="ml-1 w-4 h-4 opacity-60" viewBox="0 0 20 20" fill="none">
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={1.5} />
        </svg>
      </Button>
      {open && (
        <ul
          className="absolute right-0 mt-1 z-50 bg-white border border-gray-200 rounded shadow-lg min-w-[44px] py-1"
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt.code}
              className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer ${selectedCurrency === opt.code ? "bg-gray-100 font-bold" : ""}`}
              onClick={() => handleCurrencySelect(opt.code)}
              role="option"
              aria-selected={selectedCurrency === opt.code}
            >
              <span className="flex items-center text-lg">{opt.symbol}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
