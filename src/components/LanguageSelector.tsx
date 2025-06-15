
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const LANGS = [
  { code: "en", label: "English", emoji: "🇬🇧" },
  { code: "he", label: "עברית", emoji: "🇮🇱" },
  { code: "fr", label: "Français", emoji: "🇫🇷" },
  { code: "ru", label: "Русский", emoji: "🇷🇺" },
  { code: "ar", label: "العربية", emoji: "🇸🇦" },
];

export const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(LANGS[0]);
  const ref = useRef<HTMLDivElement | null>(null);

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
        <span className="text-lg">{lang.emoji}</span>
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
              className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer ${lang.code === opt.code ? "bg-gray-100 font-bold" : ""}`}
              onClick={() => {
                setLang(opt);
                setOpen(false);
              }}
              role="option"
              aria-selected={lang.code === opt.code}
            >
              <span className="text-lg">{opt.emoji}</span>
              <span className="text-sm">{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
