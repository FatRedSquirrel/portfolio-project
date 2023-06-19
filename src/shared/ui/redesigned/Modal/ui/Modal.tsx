import { ReactNode } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { Portal } from '@/shared/ui/redesigned/Portal';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Overlay } from '@/shared/ui/redesigned/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal';
import cls from './Modal.module.scss';
import { toggleFeatures } from '@/shared/features';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    lazy,
  } = props;

  const { theme } = useTheme();

  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    lazy,
    isOpen,
  });

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div className={
        classNames(
          cls.Modal,
          className,
          cls[theme],
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.ModalRedesigned,
            off: () => cls.ModalDeprecated,
          }),
          isOpen && cls.opened,
          isClosing && cls.isClosing,
        )
      }
      >
        <Overlay onClick={close} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
