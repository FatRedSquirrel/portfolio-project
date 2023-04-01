import { ChangeEvent, memo, useMemo } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

interface SelectOption {
  value: string
  content: string
}

interface SelectProps {
  label?: string
  options?: Array<SelectOption>
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
  const {
    label,
    options,
    value,
    onChange,
    readonly,
  } = props;

  const optionsList = useMemo(() => options?.map((opt) => (
    <option
      key={opt.value}
      className={cls.option}
      value={opt.value}
    >
      {opt.content}
    </option>
  )), [options]);

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={cls.wrapper}>
      {label
      && (
        <span className={cls.label}>
          {`${label}>`}
        </span>
      )}
      <select
        className={cls.select}
        value={value}
        onChange={changeHandler}
        disabled={readonly}
      >
        {optionsList}
      </select>
    </div>
  );
});
