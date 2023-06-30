import { memo, useEffect, useState } from 'react';
import { classNamesRedesigned } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToolbar.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ScrollToTopButton } from '@/features/scrollToTopButton';
import { useObservePageScrool } from '@/shared/lib/hooks/useObservePageScroll';

interface ScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;

  const goUpShown = useObservePageScrool();

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
