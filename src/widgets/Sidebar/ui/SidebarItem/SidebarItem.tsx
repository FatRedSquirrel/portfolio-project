import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { memo } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/items';

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
    <AppLink
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
    </AppLink>
  );
});
