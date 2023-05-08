import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, {
  memo, useCallback, useMemo, useState,
} from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { Text } from 'shared/ui/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Dropdown';
import { Avatar } from 'shared/ui/Avatar';
import { useNavigate } from 'react-router-dom';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isAuthModal, setIsAuthModal] = useState(false);

  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  console.log(authData?.roles);

  const isAdminPanelAvailable = isAdmin || isManager;

  const navigate = useNavigate();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const items = useMemo(
    () => [
      ...(isAdminPanelAvailable ? [{
        content: t('Админка'),
        onClick: () => navigate(RoutePath.admin_panel),
      }] : []),
      {
        content: t('Профиль'),
        onClick: () => navigate(`${RoutePath.profile}/${authData?.id}`),
      },
      {
        content: t('Выйти'),
        onClick: onLogout,
      },
    ],
    [authData?.id, isAdminPanelAvailable, navigate, onLogout, t],
  );

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
        <Dropdown
          trigger={<Avatar size={40} src={authData.avatar} />}
          items={items}
        />
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
