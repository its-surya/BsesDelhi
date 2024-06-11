// LanguageContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import i18n, { changeLanguage } from '../components/i18Instance';

interface LanguageContextType {
  language: string;
  changeLanguage: (lng: string) => void;
}

interface languageProviderProps {
    children : ReactNode
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<languageProviderProps> = ({ children }) => {

  const [language, setLanguage] = useState<string>(i18n.language);

  const handleChangeLanguage = async (lng: string) => {
    await changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage: handleChangeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
