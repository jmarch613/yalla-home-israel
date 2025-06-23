
import React, { useState, useRef } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage, Language } from "@/contexts/LanguageContext";

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

const options: LanguageOption[] = [
  {
    code: "en",
    label: "English",
    flag: "🇺🇸"
  },
  {
    code: "fr", 
    label: "Français",
    flag: "🇫🇷"
  },
  {
    code: "he",
    label: "עברית",
    flag: "🇮🇱"
  },
  {
    code: "ru",
    label: "Русский",
    flag: "🇷🇺"
  },
];

export const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const containerRef = useRef<HTMLDivElement|null>(null);

  const currentOption = options.find(opt => opt.code === selectedLanguage) || options[0];

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

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
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
        <span className="flex items-center justify-center text-lg">{currentOption.flag}</span>
        <svg className="ml-1 w-4 h-4 opacity-60" viewBox="0 0 20 20" fill="none">
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={1.5} />
        </svg>
      </Button>
      {open && (
        <ul
          className="absolute right-0 mt-1 z-50 bg-white border border-gray-200 rounded shadow-lg min-w-[140px] py-1"
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt.code}
              className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer ${selectedLanguage === opt.code ? "bg-gray-100 font-bold" : ""}`}
              onClick={() => handleLanguageSelect(opt.code)}
              role="option"
              aria-selected={selectedLanguage === opt.code}
            >
              <span className="flex items-center text-lg">{opt.flag}</span>
              <span className="text-sm">{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
