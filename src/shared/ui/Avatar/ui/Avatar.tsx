import { CSSProperties, useMemo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
  empty?: boolean
}

export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    size,
    alt,
    empty,
  } = props;

  const styles = useMemo<CSSProperties>(() => ({
    width: size || 100,
    height: size || 100,
  }), [size]);

  return (
    <div
      className={classNames(cls.avatar, className, empty && cls.empty)}
      style={styles}
    >
      <img
        className={className}
        src={src}
        alt={alt}
      />
    </div>
  );
};
