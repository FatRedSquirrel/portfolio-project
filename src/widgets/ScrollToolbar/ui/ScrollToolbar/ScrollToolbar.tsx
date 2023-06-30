import { memo, useEffect, useState } from 'react';
import { classNamesRedesigned } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToolbar.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ScrollToTopButton } from '@/features/scrollToTopButton';

interface ScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;

  const [goUpShown, setGoUpShown] = useState(false);

  const observePageScroll = () => {
    let shown = false;

    return () => {
      const offsetTop = window.scrollY;
      if (offsetTop > 1200 && !shown) {
        shown = true;
        setGoUpShown(true);
      } else if (offsetTop < 1200 && shown) {
        shown = false;
        setGoUpShown(false);
      }
    };
  };

  useEffect(() => {
    document.addEventListener('scroll', observePageScroll());

    return () => {
      document.removeEventListener('scroll', observePageScroll());
    };
  }, []);

  return (
    <VStack
      justify="center"
      align="center"
      max
      className={classNamesRedesigned(cls.ScrollToolbar, {}, [className])}
    >
      {goUpShown && <ScrollToTopButton />}
    </VStack>
  );
});
