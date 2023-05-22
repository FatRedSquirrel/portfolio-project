import {
  ImgHTMLAttributes, ReactElement, memo, useEffect, useState,
} from 'react';
import _ from 'lodash';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  fallBack?: ReactElement
  errorFallback?: ReactElement
}

export const AppImage = memo((props: AppImageProps) => {
  const {
    className,
    alt = 'image',
    src,
    fallBack,
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

  if (isLoading && fallBack) {
    return fallBack;
  }

  if (hasError && errorFallback) {
    return (
      <div>
        {errorFallback}
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      {...otherProps}
    />
  );
});
