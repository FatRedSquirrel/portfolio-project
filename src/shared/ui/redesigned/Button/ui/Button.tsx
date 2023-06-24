import {
  ButtonHTMLAttributes, memo, ReactNode,
} from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled' | 'negative';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  /**
   * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
   */
  variant?: ButtonVariant;
  /**
   * Флаг, делающий кнопку квадратной
   */
  square?: boolean;
  /**
   * Размер кнопки в соответствии с дизайн системой
   */
  size?: ButtonSize;
  /**
   * Флаг, отвечающий за работу кнопки
   */
  disabled?: boolean;
  /**
   * Содержимое кнопки
   */
  children?: ReactNode;
  /**
   * Увеличивает кнопку на всю свободную ширину
   */
  fullWidth?: boolean;
  /**
   * Дополнительные элементы кнопки
   */
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    variant = 'outline',
    square,
    disabled,
    fullWidth,
    size = 'm',
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  const buttonClasses = classNames(
    cls.Button,
    className,
    cls[variant],
    cls[size],
    square && cls.square,
    disabled && cls.disabled,
    Boolean(addonLeft) && cls.withAddonLeft,
    Boolean(addonRight) && cls.withAddonRight,
  );

  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={disabled}
      {...otherProps}
    >
      <div className={cls.addonLeft}>{addonLeft}</div>
      {children}
      <div className={cls.addonRight}>{addonRight}</div>
    </button>
  );
});
