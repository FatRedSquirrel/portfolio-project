import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { ToggleFeatures } from '@/shared/features';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation('translation');

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Button
          variant="clear"
          className={cls.button}
          onClick={toggle}
        >
          {t('Язык')}
        </Button>
      )}
      off={(
        <ButtonDeprecated
          className={className}
          theme={ButtonTheme.CLEAR}
          onClick={toggle}
        >
          {t('Язык')}
        </ButtonDeprecated>
      )}
    />
  );
});
