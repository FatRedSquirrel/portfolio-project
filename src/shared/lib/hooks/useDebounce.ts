import { useRef } from 'react';

export default function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  return (...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
