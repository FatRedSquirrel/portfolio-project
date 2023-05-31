import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import { Theme, ThemeContext } from '../lib/ThemeContext';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {initialTheme?: Theme;children: ReactNode
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const {
    initialTheme,
    children,
  } = props;

  const { theme: defaultTheme } = useJsonSettings();
  const [theme, setTheme] = useState<Theme>(defaultTheme || initialTheme || Theme.LIGHT);

  useEffect(() => {
    setTheme(defaultTheme || Theme.LIGHT);
  }, [defaultTheme]);

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
