import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {initialTheme?: Theme;children: ReactNode}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider = (props: ThemeProviderProps) => {
  const {
    initialTheme,
    children,
  } = props;

  const { theme: defaultTheme } = useJsonSettings();
  const [themeInited, setThemeInited] = useState(false);
  const [theme, setTheme] = useState<Theme>(defaultTheme || initialTheme || fallbackTheme || Theme.LIGHT);

  useEffect(() => {
    if (!themeInited && defaultTheme) {
      setTheme(defaultTheme);
      setThemeInited(true);
    }
  }, [defaultTheme, themeInited, theme]);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  const defaultProps = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
