
import React, { useState, useRef } from "react";
import { DollarSign, Euro, PoundSterling } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CurrencyOption {
  code: "ILS" | "USD" | "EUR" | "GBP";
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
  const [currency, setCurrency] = useState<CurrencyOption>(options[0]);
  const containerRef = useRef<HTMLDivElement|null>(null);

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

  return (
    <div className="relative" ref={containerRef}>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 px-3 py-2 min-w-[100px] border-gray-300"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {currency.icon}
        <span className="ml-1">{currency.code}</span>
        <svg className="ml-1 w-4 h-4 opacity-60" viewBox="0 0 20 20" fill="none">
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={1.5} />
        </svg>
      </Button>
      {open && (
        <ul
          className="absolute right-0 mt-1 z-50 bg-white border border-gray-200 rounded shadow-lg min-w-[150px] py-1"
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt.code}
              className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer ${currency.code === opt.code ? "bg-gray-100 font-bold" : ""}`}
              onClick={() => {
                setCurrency(opt);
                setOpen(false);
              }}
              role="option"
              aria-selected={currency.code === opt.code}
            >
              {opt.icon}
              <span className="ml-2">{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
