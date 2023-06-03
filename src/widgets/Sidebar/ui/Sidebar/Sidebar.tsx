import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher';
import { LangSwitcher } from '@/shared/ui/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebar';
import { VStack } from '@/shared/ui/Stack';
import cls from './Sidebar.module.scss';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { ToggleFeatures } from '@/shared/features';
import { AppLogo } from '@/shared/ui/AppLogo';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const items: SidebarItemType[] = useSelector(getSidebarItems);

  const itemsList = useMemo(() => items.map((item) => (
    <SidebarItem
      key={item.path}
      item={item}
      collapsed={collapsed}
    />
  )), [items, collapsed]);

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <menu
          data-testid="sidebar"
          className={classNames(
            cls.SidebarRedesigned,
            collapsed && cls.collapsed,
            className,
          )}
        >
          <AppLogo className={cls.appLogo} />
        </menu>
      )}
      off={(
        <menu
          data-testid="sidebar"
          className={classNames(
            cls.Sidebar,
            collapsed && cls.collapsed,
            className,
          )}
        >
          <Button
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className={cls.collapseBtn}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            size={ButtonSize.L}
            square
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack
            align='start'
            gap='16'
            className={cls.items}
          >
            {itemsList}
          </VStack>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher
              short={collapsed}
              className={cls.lang}
            />
          </div>
        </menu>
      )}
    />
  );
});
