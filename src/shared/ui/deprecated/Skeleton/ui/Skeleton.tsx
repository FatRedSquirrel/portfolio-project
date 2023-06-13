import { CSSProperties } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string
  height?: string | number
  width?: string | number
  round?: boolean
  border?: string
}

/**
 * @deprecated
 */
export const Skeleton = (props: SkeletonProps) => {
  const {
    className,
    height,
    width,
    round,
    border,
  } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div
      className={classNames(cls.skeleton, className, round && cls.round)}
      style={styles}
    />
  );
};
