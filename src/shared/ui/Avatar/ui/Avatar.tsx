import { CSSProperties, useMemo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import UserIcon from '@/shared/assets/icons/user.svg';
import { AppImage } from '../../AppImage';
import { Skeleton } from '../../Skeleton/ui/Skeleton';

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
    size = 100,
    alt,
    empty,
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
        empty && cls.empty,
      )}
      style={styles}
    >
      <AppImage
        className={className}
        fallBack={fallBack}
        errorFallback={errorFallback}
        src={src}
        alt={alt}
      />
    </div>
  );
};
