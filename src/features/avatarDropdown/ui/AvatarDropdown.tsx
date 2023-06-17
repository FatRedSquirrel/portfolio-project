import { useTranslation } from 'react-i18next';
import {
  useCallback, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import { RoutePath, getRouteProfile, getRouteSettings } from '@/shared/const/router';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Dropdown';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import cls from './AvatarDropdown.module.scss';
import { ToggleFeatures } from '@/shared/features';

export const AvatarDropdown = () => {
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
        onClick: () => navigate(getRouteProfile(authData?.id || '')),
      },
      {
        content: t('Настройки'),
        onClick: () => navigate(getRouteSettings()),
      },
      {
        content: t('Выйти'),
        onClick: onLogout,
      },
    ],
    [authData?.id, isAdminPanelAvailable, navigate, onLogout, t],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={(
        <DropdownDeprecated
          trigger={(
            <AvatarDeprecated
              className={cls.avatar}
              size={40}
              src={authData?.avatar}
            />
          )}
          items={items}
        />
      )}
      on={(
        <Dropdown
          direction='bottom left'
          trigger={(
            <Avatar
              size={48}
              src={authData?.avatar}
              className={cls.avatarRedesigned}
            />
          )}
          items={items}
        />
      )}
    />
  );
};
