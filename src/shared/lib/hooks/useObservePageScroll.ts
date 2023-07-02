import { useCallback, useEffect, useState } from 'react';

export const useObservePageScrool = (offsetY: number) => {
  const [goUpShown, setGoUpShown] = useState(false);

  const observePageScroll = useCallback(() => {
    let shown = false;

    return () => {
      const offsetTop = window.scrollY;
      if (offsetTop > offsetY && !shown) {
        shown = true;
        setGoUpShown(true);
      } else if (offsetTop < offsetY && shown) {
        shown = false;
        setGoUpShown(false);
      }
    };
  }, [offsetY]);

  useEffect(() => {
    const scrollHandler = observePageScroll();

    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [observePageScroll]);

  return goUpShown;
};
