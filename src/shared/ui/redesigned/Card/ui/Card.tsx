import { HTMLAttributes, memo, ReactNode } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'normalBorder';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    max?: boolean;
    padding?: CardPadding;
    border?: CardBorder;
    fullWidth?: boolean;
    fullHeight?: boolean;
    hoverable?: boolean
}

const mapPaddingToClass: Record<CardPadding, string> = {
  0: 'gap_0',
  8: 'gap_8',
  16: 'gap_16',
  24: 'gap_24',
};

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    variant = 'normal',
    max,
    padding = '8',
    border = 'normalBorder',
    fullWidth,
    fullHeight,
    hoverable,
    ...otherProps
  } = props;

  const paddingClass = mapPaddingToClass[padding];

  return (
    <div
      className={classNames(
        cls.Card,
        max && cls.max,
        className,
        cls[variant],
        cls[paddingClass],
        cls[border],
        hoverable && cls.hoverable,
        fullWidth && cls.fullWidth,
        fullHeight && cls.fullHeight,
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
});
