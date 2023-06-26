import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { Text } from '@/shared/ui/deprecated/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NotificationsButton } from '@/features/notificationsButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import cls from './Navbar.module.scss';
import { getRouteArticlesCreate } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/features';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <header
            className={classNames(cls.NavbarRedesigned, {}, [
              className,
            ])}
          >
            <HStack gap="16" className={cls.actions}>
              <NotificationsButton />
              <AvatarDropdown />
            </HStack>
          </header>
        )}
        off={(
          <header className={classNames(cls.Navbar, {}, [className])}>
            <Text
              className={cls.appName}
              title={t('Ulbi TV App') as string}
            />
            <AppLink
              to={getRouteArticlesCreate()}
              theme={AppLinkTheme.SECONDARY}
            >
              {t('Создать статью')}
            </AppLink>
            <HStack gap="16" className={cls.actions}>
              <NotificationsButton />
              <AvatarDropdown />
            </HStack>
          </header>
        )}
      />
    );
  }

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.NavbarRedesigned,
    off: () => cls.Navbar,
  });

  return (
    <header className={classNames(mainClass, {}, [className])}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <Button
            variant='clear'
            className={cls.links}
            onClick={onShowModal}
          >
            {t('Войти')}
          </Button>
        )}
        off={(
          <ButtonDeprecated
            theme={ButtonTheme.CLEAR_INVERTED}
            className={cls.links}
            onClick={onShowModal}
          >
            {t('Войти')}
          </ButtonDeprecated>
        )}
      />
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
