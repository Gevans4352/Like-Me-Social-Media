import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface DarkModeContextType {
  darkMode: boolean;
  toggle: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggle: () => {}
});

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeContextProvider = ({ children }: DarkModeProviderProps) => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedValue = localStorage.getItem("darkMode");
    return storedValue === "true";
  });

  const toggle = () => {
    setDarkMode(prevMode => !prevMode);
    console.log("Dark mode toggled to:", !darkMode);
  };
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    console.log("Dark mode value updated in localStorage:", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};