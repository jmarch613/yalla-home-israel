
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = "ILS" | "USD" | "EUR" | "GBP";

interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  convertPrice: (price: string, fromCurrency?: Currency) => string;
  getCurrencySymbol: (currency: Currency) => string;
}

// Approximate exchange rates (ILS as base currency)
const EXCHANGE_RATES = {
  ILS: 1,
  USD: 0.27, // 1 ILS = 0.27 USD (approximately)
  EUR: 0.25, // 1 ILS = 0.25 EUR (approximately)
  GBP: 0.21, // 1 ILS = 0.21 GBP (approximately)
};

const CURRENCY_SYMBOLS = {
  ILS: "₪",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("ILS");

  const getCurrencySymbol = (currency: Currency) => CURRENCY_SYMBOLS[currency];

  const convertPrice = (price: string, fromCurrency: Currency = "ILS") => {
    // Extract numeric value from price string
    const numericValue = parseFloat(price.replace(/[^\d]/g, ''));
    
    if (isNaN(numericValue)) return price;

    // Convert from source currency to ILS first
    const ilsValue = fromCurrency === "ILS" ? numericValue : numericValue / EXCHANGE_RATES[fromCurrency];
    
    // Then convert from ILS to target currency
    const convertedValue = ilsValue * EXCHANGE_RATES[selectedCurrency];
    
    // Format the converted price
    const symbol = getCurrencySymbol(selectedCurrency);
    return `${symbol}${Math.round(convertedValue).toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{
      selectedCurrency,
      setSelectedCurrency,
      convertPrice,
      getCurrencySymbol
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
