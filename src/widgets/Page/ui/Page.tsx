import classNames from 'shared/lib/classNames/classNames';
import {
  MutableRefObject, ReactNode, useRef, UIEvent,
} from 'react';
import useInfiniteScroll from 'shared/lib/hooks/useInfiniteScroll';
import { useDispatch, useSelector } from 'react-redux';
import { getPageScrollByPath, pageActions } from 'widgets/Page';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { StateSchema } from 'app/providers/StoreProvider';
import useThrottle from 'shared/lib/hooks/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const Page = (props: PageProps) => {
  const {
    className,
    children,
    onScrollEnd,
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
      ref={wrapperRef}
      className={classNames(cls.page, className)}
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
