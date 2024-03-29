import React, {
  memo, ReactNode, useCallback, useEffect,
} from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AnimationProvider, useAnimationLibs } from '@/shared/lib/components/AnimationProvider';
import { Overlay } from '@/shared/ui/redesigned/Overlay';
import cls from './Drawer.module.scss';
import { Portal } from '@/shared/ui/redesigned/Portal';
import { toggleFeatures } from '@/shared/features';

interface DrawerProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
    inverted?: boolean
}

const height = window.innerHeight - 100;

export const DrawerContent = memo((props: DrawerProps) => {
  const {
    className,
    children,
    onClose,
    isOpen,
    lazy,
    inverted,
  } = props;

  const { theme } = useTheme();

  const { Spring, Gesture } = useAnimationLibs();
  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

  const openDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false });
  }, [api]);

  useEffect(() => {
    if (isOpen) {
      openDrawer();
    }
  }, [api, isOpen, openDrawer]);

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...Spring.config.stiff, velocity },
      onResolve: onClose,
    });
  };

  const bind = Gesture.useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
    }) => {
      if (my < -70) cancel();

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close();
        } else {
          openDrawer();
        }
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    {
      from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true,
    },
  );

  if (!isOpen) {
    return null;
  }

  const display = y.to((py) => (py < height ? 'block' : 'none'));

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div className={classNames(
        cls.Drawer,
        className,
        theme,
        toggleFeatures({
          name: 'isAppRedesigned',
          on: () => cls.DrawerRedesigned,
          off: () => cls.DrawerDeprecated,
        }),
      )}
      >
        <Overlay />
        <Spring.a.div
          className={classNames(
            cls.sheet,
            inverted && cls.inverted,
          )}
          style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
});

const DrawerAsync = (props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => (
  <AnimationProvider>
    <DrawerAsync {...props} />
  </AnimationProvider>
);
