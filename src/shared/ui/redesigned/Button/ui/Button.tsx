import {
  ButtonHTMLAttributes, memo, ReactNode,
} from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline';
export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    variant = 'outline',
    square,
    disabled,
    size = 'm',
    ...otherProps
  } = props;

  const buttonClasses = classNames(
    cls.Button,
    className,
    cls[variant],
    cls[size],
    square && cls.square,
    disabled && cls.disabled,
  );

  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
