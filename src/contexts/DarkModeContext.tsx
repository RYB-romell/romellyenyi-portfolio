import React, { useEffect, useState } from 'react';
import { DarkModeContext, type DarkModeContextType } from './themeContext';

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');

    if (saved !== null) {
      try {
        return JSON.parse(saved) === true;
      } catch {
        localStorage.removeItem('darkMode');
      }
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDarkMode);
    root.dataset.theme = isDarkMode ? 'dark' : 'light';
    root.style.colorScheme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((previous) => !previous);
  };

  const value: DarkModeContextType = { isDarkMode, toggleDarkMode };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};