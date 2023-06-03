import { NavLink, LinkProps } from 'react-router-dom';
import { memo, ReactNode } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: ReactNode;
    activeClassname?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    to,
    className,
    children,
    variant = 'primary',
    activeClassname = '',
    ...otherProps
  } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        cls.AppLink,
        cls[variant],
        className,
        isActive && activeClassname,
      )}
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
