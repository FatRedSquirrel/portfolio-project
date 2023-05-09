import classNames from 'shared/lib/classNames/classNames';
import React, { memo, ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../../Overlay';
import cls from './Drawer.module.scss';
import { Portal } from '../../Portal';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className,
    children,
    onClose,
    isOpen,
  } = props;
  const { theme } = useTheme();

  return (
    <Portal>
      <div className={classNames(cls.Drawer, isOpen && cls.opened, className, theme, 'app_drawer')}>
        <Overlay onClick={onClose} />
        <div
          className={cls.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
