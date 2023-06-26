import { useTranslation } from 'react-i18next';
import {
  useCallback, useEffect, useMemo, useState,
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
import { getProfileData, getProfileIsLoading } from '@/entities/Profile';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const AvatarDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [avatrarUrl, setAvatrarUrl] = useState('');
  const [inited, setInited] = useState(false);

  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const profileData = useSelector(getProfileData);
  const profileLoading = useSelector(getProfileIsLoading);

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

  useEffect(() => {
    if (!profileLoading) {
      setInited(true);
    }
  }, [profileLoading]);

  useEffect(() => {
    if (!inited) {
      setAvatrarUrl(profileData?.avatar || '');
    }
  }, [profileData?.avatar, inited]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={(
        <DropdownDeprecated
          trigger={(
            <AvatarDeprecated
              className={cls.avatar}
              size={40}
              src={profileData?.avatar}
            />
          )}
          items={items}
        />
      )}
      on={(
        <Dropdown
          direction='bottom left'
          trigger={inited ? (
            <Avatar
              size={48}
              src={avatrarUrl}
              className={cls.avatarRedesigned}
            />
          ) : (
            <Skeleton width={48} height={48} border='100%' />
          )}
          items={items}
        />
      )}
    />
  );
};
