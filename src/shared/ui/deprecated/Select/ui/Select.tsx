import { ChangeEvent, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T
  content: string
}

interface SelectProps<T extends string> {
  label?: string
  options?: Array<SelectOption<T>>
  value?: T
  onChange?: (value: T) => void
  readonly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
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
    onChange?.(e.target.value as T);
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
};
