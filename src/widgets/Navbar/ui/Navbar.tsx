import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
  memo, useCallback, useState,
} from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useSelector } from 'react-redux';
import {
  getUserAuthData,
} from 'entities/User';
import { Text } from 'shared/ui/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { NotificationsButton } from 'features/notificationsButton';
import { AvatarDropdown } from 'features/avatarDropdown';
import { Drawer } from 'shared/ui/Drawer';
import { NotificationsList } from 'entities/Notification';
import cls from './Navbar.module.scss';

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
      <header className={classNames(cls.Navbar, className)}>
        <Text
          className={cls.logo}
          title='Portfolio App'
        />
        <AppLink
          className={cls.createArticleLink}
          theme={AppLinkTheme.OUTLINED}
          to={RoutePath.article_create}
        >
          Создать статью
        </AppLink>
        <div className={cls.actions}>
          <NotificationsButton />
          <AvatarDropdown />
        </div>
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Text
        className={cls.logo}
        title='Portfolio App'
      />
      <Button
        className={cls.loginBtn}
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={onShowModal}
      >
        {t('Войти')}
      </Button>

      {isAuthModal && (
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      )}
    </header>
  );
});
