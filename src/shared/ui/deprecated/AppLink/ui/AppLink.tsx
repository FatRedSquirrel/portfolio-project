import { Link, LinkProps } from 'react-router-dom';
import { memo, ReactNode } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    OUTLINED = 'outlined',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children?: ReactNode;
}

/**
 * @deprecated
 */
export const AppLink = memo((props: AppLinkProps) => {
  const {
    to,
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props;

  return (
    <Link
      to={to}
      className={
        classNames(
          cls.AppLink,
          cls[theme],
          className,
        )
      }
      {...otherProps}
    >
      {children}
    </Link>
  );
});