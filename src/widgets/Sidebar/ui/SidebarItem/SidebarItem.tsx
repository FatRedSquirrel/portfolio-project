import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import classNames from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/types/sidebar';
import { ToggleFeatures } from '@/shared/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const {
    item,
    collapsed,
  } = props;

  const { t } = useTranslation();

  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <AppLink
          to={item.path}
          activeClassName={cls.active}
          className={
            classNames(
              cls.itemRedesigned,
              collapsed && cls.collapsedRedesigned,
            )
          }
        >
          <Icon Svg={item.Icon} className={cls.icon} />
          {/* <item.Icon className={cls.icon} /> */}
          <span className={cls.link}>
            {t(item.text)}
          </span>
        </AppLink>
      )}
      off={(
        <AppLinkDeprecated
          theme={AppLinkTheme.SECONDARY}
          to={item.path}
          className={
            classNames(
              cls.item,
              collapsed && cls.collapsed,
            )
          }
        >
          <item.Icon className={cls.icon} />
          <span className={cls.link}>
            {t(item.text)}
          </span>
        </AppLinkDeprecated>
      )}
    />
  );
});
