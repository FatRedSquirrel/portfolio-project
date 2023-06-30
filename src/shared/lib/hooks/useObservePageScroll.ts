import { useEffect, useState } from 'react';

export const useObservePageScrool = () => {
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
    const scrollHandler = observePageScroll();

    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return goUpShown;
};
