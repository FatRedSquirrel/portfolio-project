import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import _ from 'lodash';
import classNames from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { HStack } from '../../../Stack';
import { Button } from '../../../Button/ui/Button';
import cls from './ListBox.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import { Icon } from '../../../Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import TickIcon from '@/shared/assets/icons/tick.svg';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T> {
    items?: ListBoxItem[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom right',
    label,
  } = props;

  const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

  const selectedItem = _.find(items, { value });

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(cls.ListBox, ...[
          className,
          popupCls.popup,
        ])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button className={classNames(
          cls.trigger,
          readonly && cls.disabled,
        )}
        >
          {({ open }) => (
            <Button
              className={cls.triggerButton}
              variant='filled'
              disabled={readonly}
            >
              {selectedItem?.content ?? defaultValue}
              <Icon
                className={open ? cls.arrowReversed : ''}
                Svg={ArrowIcon}
              />
            </Button>
          )}
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, ...optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    cls.item,
                    active && popupCls.active,
                    selected && popupCls.selected,
                    item.disabled && popupCls.disabled,
                  )}
                >
                  {item.content}
                  {selected && (
                    <Icon
                      width={24}
                      height={24}
                      Svg={TickIcon}
                    />
                  )}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}
