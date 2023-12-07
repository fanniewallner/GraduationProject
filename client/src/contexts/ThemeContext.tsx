import React, { createContext, useContext, useState, ReactNode } from "react";
import { colors } from "./ThemeVariables";
//import { colors } from '../theme/themeVariables';

interface Theme {
  breakpoints: {
    sm: number;
    md: number;
    lg: number;
  };
  primaryBackgroundColor: string;
  secondaryBackgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  contrastColor: string;
}

interface ThemeContextProps {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme] = useState<Theme>({
    breakpoints: {
      sm: 678,
      md: 900,
      lg: 1280,
    },
    primaryBackgroundColor: colors.primayBackgroundColor,
    secondaryBackgroundColor: colors.secondaryBackgroundColor,
    primaryColor: colors.primaryColor,
    contrastColor: colors.contrastColor,
    secondaryColor: colors.secondaryColor,
  });

  const contextValue: ThemeContextProps = {
    theme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
