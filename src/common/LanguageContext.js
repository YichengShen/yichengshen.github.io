import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [hasSwitchedLanguage, setHasSwitchedLanguage] = useState(false);

  const switchLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setHasSwitchedLanguage(true);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        switchLanguage,
        hasSwitchedLanguage,
        setHasSwitchedLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
