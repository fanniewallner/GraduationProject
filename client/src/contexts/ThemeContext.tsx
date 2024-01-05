import React, { createContext, useContext, useState, ReactNode } from "react";

const colors = {
  primaryBackgroundColor: "#1d1d1def",
  secondaryBackgroundColor: "#556c56",
  primaryColor: "#556c56",
  secondaryColor: "#F7F4F4",
  contrastColor: "#556c56",
};

interface Theme {
  breakpoints: {
    sm: number;
    md: number;
    lg: number;
  };
  typography: {
    fontFamily: string;
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
    typography: { fontFamily: ["Poppins", "sans-serif"].join(",") },
    primaryBackgroundColor: colors.primaryBackgroundColor,
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
      <style>{`
        :root {
          --primary-background-color: ${theme.primaryBackgroundColor};
          --secondary-background-color: ${theme.secondaryBackgroundColor};
          --primary-color: ${theme.primaryColor};
          --secondary-color: ${theme.secondaryColor};
          --contrast-color: ${theme.contrastColor};
          --font-family: ${theme.typography.fontFamily};
        }

      `}</style>
    </ThemeContext.Provider>
  );
};
