import { CSSProperties, useMemo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import UserIcon from '@/shared/assets/icons/user-filled.svg';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '../../Skeleton/ui/Skeleton';

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
}

/**
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    size = 100,
    alt,
  } = props;

  const styles = useMemo<CSSProperties>(() => ({
    width: size,
    height: size,
  }), [size]);

  const fallBack = (
    <Skeleton
      width={size}
      height={size}
      border={100}
    />
  );
  const errorFallback = (
    <UserIcon
      width={size - 10}
      height={size - 10}
    />
  );

  return (
    <div
      className={classNames(
        cls.avatar,
        className,
      )}
      style={styles}
    >
      <AppImage
        className={className}
        fallback={fallBack}
        errorFallback={errorFallback}
        src={src}
        alt={alt}
      />
    </div>
  );
};
