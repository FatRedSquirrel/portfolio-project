import classNames from 'shared/lib/classNames/classNames';
import React, { memo, ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from 'shared/lib/hooks/useModal';
import { Overlay } from '../../Overlay';
import cls from './Drawer.module.scss';
import { Portal } from '../../Portal';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    lazy?: boolean
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className,
    children,
    onClose,
    isOpen,
    lazy,
  } = props;
  const { theme } = useTheme();

  const { close, isClosing, isMounted } = useModal({
    isOpen,
    onClose,
    animationDelay: 200,
    lazy,
  });

  if (lazy && !isMounted) return null;

  return (
    <Portal>
      <div className={classNames(
        cls.Drawer,
        isOpen && cls.opened,
        isClosing && cls.isClosing,
        className,
        theme,
        'app_drawer',
      )}
      >
        <Overlay onClick={close} />
        <div
          className={cls.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
