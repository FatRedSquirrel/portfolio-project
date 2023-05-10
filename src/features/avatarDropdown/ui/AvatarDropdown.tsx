import { useTranslation } from 'react-i18next';
import {
  useCallback, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Dropdown } from '@/shared/ui/Dropdown';
import { Avatar } from '@/shared/ui/Avatar';

interface AvatarDropdownProps {

}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const isAdminPanelAvailable = isAdmin || isManager;

  const navigate = useNavigate();

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

  return (
    <Dropdown
      trigger={(
        <Avatar
          size={40}
          src={authData?.avatar || ''}
        />
      )}
      items={items}
    />
  );
};
