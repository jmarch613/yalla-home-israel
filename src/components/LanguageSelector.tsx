
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const LANGS = [
  { code: "en" as Language, label: "English", flag: "🇺🇸", aria: "United States flag" },
  { code: "he" as Language, label: "עברית", flag: "🇮🇱", aria: "Israel flag" },
  { code: "fr" as Language, label: "Français", flag: "🇪🇺", aria: "European Union flag" },
  { code: "ru" as Language, label: "Русский", flag: "🇷🇺", aria: "Russia flag" },
  { code: "ar" as Language, label: "العربية", flag: "🇸🇦", aria: "Saudi Arabia flag" }
];

export const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const currentLang = LANGS.find(lang => lang.code === currentLanguage) || LANGS[0];

  // Close dropdown on outside click
  React.useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, [open]);

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 px-3 py-2 min-w-[44px] border-gray-300"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className="text-lg mr-1"
          style={{ fontFamily: "Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, EmojiOne Color, Android Emoji, sans-serif" }}
          aria-label={currentLang.aria}
        >
          {currentLang.flag}
        </span>
        <svg className="ml-1 w-4 h-4 opacity-60" viewBox="0 0 20 20" fill="none">
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={1.5} />
        </svg>
      </Button>
      {open && (
        <ul
          className="absolute right-0 mt-1 z-50 bg-white border border-gray-200 rounded shadow-lg min-w-[44px] py-1"
          role="listbox"
        >
          {LANGS.map(opt => (
            <li
              key={opt.code}
              className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer ${currentLanguage === opt.code ? "bg-gray-100 font-bold" : ""}`}
              onClick={() => handleLanguageSelect(opt.code)}
              role="option"
              aria-selected={currentLanguage === opt.code}
            >
              <span
                className="text-lg mr-1"
                style={{ fontFamily: "Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, EmojiOne Color, Android Emoji, sans-serif" }}
                aria-label={opt.aria}
              >
                {opt.flag}
              </span>
              <span className="text-sm">{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
