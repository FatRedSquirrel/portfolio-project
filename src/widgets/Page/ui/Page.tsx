import {
  MutableRefObject, ReactNode, useRef, UIEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useInfiniteScroll from '@/shared/lib/hooks/useInfiniteScroll';
import classNames from '@/shared/lib/classNames/classNames';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { StateSchema } from '@/app/providers/StoreProvider';
import useThrottle from '@/shared/lib/hooks/useThrottle';
import { pageActions } from '../model/slice/pageSlice';
import { getPageScrollByPath } from '../model/selectors/pageSelectors';
import cls from './Page.module.scss';
import { TestProps } from '@/shared/types/tests';
import { toggleFeatures } from '@/shared/features';

interface PageProps extends TestProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const Page = (props: PageProps) => {
  const {
    className,
    children,
    onScrollEnd,
    dataTestid,
  } = props;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useDispatch();
  const location = useLocation();
  const scrollPosition = useSelector((state: StateSchema) => getPageScrollByPath(state, location.pathname));

  useInfiniteScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  }, []);

  const handleScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(pageActions.setScrollPosition({
      path: location.pathname,
      position: e.currentTarget.scrollTop,
    }));
  }, 500);

  return (
    <section
      data-testid={dataTestid}
      ref={wrapperRef}
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          on: () => cls.PageRedesigned,
          off: () => cls.page,
        }),
        className,
      )}
      onScroll={handleScroll}
    >
      {children}
      {onScrollEnd
        && (
          <div
            className={cls.trigger}
            ref={triggerRef}
          />
        )}
    </section>
  );
};
