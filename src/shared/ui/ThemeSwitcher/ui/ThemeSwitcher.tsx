import { memo } from 'react';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const dispatch = useAppDispatch();

  const { theme, toggleTheme } = useTheme();

  const saveTheme = (theme: Theme) => {
    dispatch(saveJsonSettings({ theme }));
  };

  const handleToggleTheme = () => {
    toggleTheme(saveTheme);
  };

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={className}
      onClick={handleToggleTheme}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});
