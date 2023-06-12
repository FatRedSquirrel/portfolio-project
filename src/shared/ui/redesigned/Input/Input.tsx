import React, {
  ChangeEvent,
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
} from 'react';
import { classNamesRedesigned, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    label?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    autofocus?: boolean;
    readonly?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    label,
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autofocus) {
      ref.current?.focus();
    }
  }, [autofocus]);

  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  return (
    <div className={classNamesRedesigned(cls.InputWrapper, mods, [className])}>
      {label && (
        <div className={cls.placeholder}>{label}</div>
      )}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        className={cls.input}
        placeholder={placeholder}
        readOnly={readonly}
        {...otherProps}
      />
    </div>
  );
});
