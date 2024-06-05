import React, {createContext, useContext, useState, ReactNode} from 'react';
import {
  ThemeProvider as StyledProvider,
  DefaultTheme,
} from 'styled-components/native';

interface ThemeContextProps {
  theme: DefaultTheme;
  toggleTheme: () => void;
}

const themes = {
  light: {
    colors: {
      primary: '#454d66',
      background: '#ffffff',
      card: '#f8f9fa',
      text: '#000000',
      border: '#f0f0f0',
    },
    navigation: {
      icon: '#454d66',
    },
  },
  dark: {
    colors: {
      primary: '#454d66',
      background: '#121212',
      card: '#1f1f1f',
      text: '#ffffff',
      border: '#121212',
    },
    navigation: {
      icon: '#454d66',
    },
  },
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [theme, setTheme] = useState<DefaultTheme>(themes.light);

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <StyledProvider theme={theme}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
