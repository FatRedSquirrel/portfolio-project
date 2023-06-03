import { memo } from 'react';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ToggleFeatures } from '@/shared/features';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const dispatch = useAppDispatch();

  const { toggleTheme } = useTheme();

  const saveTheme = (theme: Theme) => {
    dispatch(saveJsonSettings({ theme }));
  };

  const handleToggleTheme = () => {
    toggleTheme(saveTheme);
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Button
          theme={ButtonTheme.CLEAR}
          className={cls.button}
          onClick={handleToggleTheme}
        >
          <ThemeIcon />
        </Button>
      )}
      off={(
        <Button
          theme={ButtonTheme.CLEAR}
          className={className}
          onClick={handleToggleTheme}
        >
          <ThemeIconDeprecated />
        </Button>
      )}
    />
  );
});
