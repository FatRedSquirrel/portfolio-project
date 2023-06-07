import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/shared/ui/deprecated/ThemeSwitcher';
import { LangSwitcher } from '@/shared/ui/deprecated/LangSwitcher';
import { Button as ButtonDeprecated, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebar';
import { VStack } from '@/shared/ui/redesigned/Stack';
import cls from './Sidebar.module.scss';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { ToggleFeatures } from '@/shared/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Button } from '@/shared/ui/redesigned/Button';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

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
            collapsed && cls.collapsedRedesigned,
            className,
          )}
        >
          <AppLogo className={cls.appLogo} />
          <VStack
            align='start'
            gap='16'
            className={cls.items}
          >
            {itemsList}
          </VStack>
          <Button
            variant='clear'
            className={cls.collapseBtn}
            onClick={onToggle}
          >
            <ArrowIcon />
          </Button>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={cls.lang} />
          </div>
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
          <ButtonDeprecated
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className={cls.collapseBtn}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            size={ButtonSize.L}
            square
          >
            {collapsed ? '>' : '<'}
          </ButtonDeprecated>
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
              className={cls.lang}
            />
          </div>
        </menu>
      )}
    />
  );
});
