import {
  CSSProperties,
  Fragment, ReactNode,
} from 'react';
import { Listbox } from '@headlessui/react';
import classNames from '@/shared/lib/classNames/classNames';
import DropDownArrow from '@/shared/assets/icons/dropdown-arrow.svg';
import cls from './ListBox.module.scss';

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

export type DirectionListbox = 'top' | 'bottom';

interface ListBoxProps<T> {
  className?: string
  items?: ListBoxItem[]
  value?: T
  defaultValue?: string
  label?: string
  readonly?: boolean
  direction?: DirectionListbox
  style?: CSSProperties
  onChange?: (value: T) => void
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
  const {
    className,
    items,
    value,
    defaultValue,
    label,
    readonly,
    direction = 'bottom',
    style,
    onChange,
  } = props;

  const getSelectedOptionLabel = (value: string) => {
    const item = items?.find((item) => item.value === value);
    return item?.content ?? '';
  };

  return (
    <div className={cls.container} style={style}>
      {label && (
        <div className={cls.label}>
          {label}
        </div>
      )}
      <Listbox
        as='div'
        className={
          classNames(
            cls.ListBox,
            readonly && cls.readonly,
            className,
          )
        }
        value={value}
        onChange={onChange}
      >
        <Listbox.Button className={cls.trigger}>
          {value ? getSelectedOptionLabel(value) : defaultValue}
          <DropDownArrow className={cls.trigger__arrow} />
        </Listbox.Button>
        <Listbox.Options
          className={
            classNames(
              cls.options,
              cls[direction],
            )
          }
        >
          {items?.map((item, index) => (
            <Listbox.Option
              as={Fragment}
              key={index}
              value={item.value}
              disabled={item.disabled}
            >
              {({ active, selected }) => (
                <li
                  className={
                    classNames(
                      cls.item,
                      selected && cls.selected,
                      active && cls.active,
                      item.disabled && cls.disabled,
                    )
                  }
                >
                  {item.content}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};
