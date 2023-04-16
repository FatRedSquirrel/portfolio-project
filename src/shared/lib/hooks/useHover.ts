import {
  useMemo,
  useCallback, useState,
} from 'react';

interface UseHoverBind {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

type useHoverResult = [boolean, UseHoverBind]

export default function useHover(): useHoverResult {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  return useMemo(() => [isHovered, { onMouseEnter, onMouseLeave }], [isHovered, onMouseEnter, onMouseLeave]);
}
