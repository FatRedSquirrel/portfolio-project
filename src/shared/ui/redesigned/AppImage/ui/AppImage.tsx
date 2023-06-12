import {
  ImgHTMLAttributes, ReactElement, memo, useEffect, useState,
} from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './AppImage.module.scss';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  fallback?: ReactElement
  errorFallback?: ReactElement
}

export const AppImage = memo((props: AppImageProps) => {
  const {
    className,
    alt = 'image',
    src,
    fallback,
    errorFallback,
    ...otherProps
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src ?? '';
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (isLoading && fallback) {
    return fallback;
  }

  if (hasError && errorFallback) {
    return (
      <div>
        {errorFallback}
      </div>
    );
  }

  return (
    <div
      className={classNames(
        cls.container,
        className,
      )}
      {...otherProps}
    >
      <img
        src={src}
        alt={alt}
      />
    </div>
  );
});
