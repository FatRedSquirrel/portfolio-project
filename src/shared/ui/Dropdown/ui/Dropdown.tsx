import { Menu, Transition } from '@headlessui/react';
import { CSSProperties, Fragment, ReactNode } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss';

type DropdownDirection = 'left' | 'right';

interface DropdownItem {
  disabled?: boolean
  content: ReactNode
  href?: string
  onClick?: () => void
}

interface DropdownProps {
  style?: CSSProperties
  className?: string
  items: DropdownItem[]
  trigger: ReactNode
  direction?: DropdownDirection
}

export const Dropdown = (props: DropdownProps) => {
  const {
    style,
    className,
    items,
    trigger,
    direction = 'left',
  } = props;

  return (
    <Menu
      style={style}
      as='div'
      className={classNames(cls.Dropdown, className)}
    >
      <Menu.Button className={cls.trigger}>
        {trigger}
      </Menu.Button>
      <Transition
        enter={cls.enter}
        enterFrom={cls.enterFrom}
        enterTo={cls.enterTo}
        leave={cls.leave}
        leaveFrom={cls.leaveFrom}
        leaveTo={cls.leaveTo}
      >
        <Menu.Items
          className={classNames(cls.items, cls[direction])}
        >
          {items && items.map((item, index) => (
            <Menu.Item
              key={index}
              as={Fragment}
              disabled={item.disabled}
            >
              {({ active }) => (
                <button
                  type='button'
                  onClick={item.onClick}
                  className={
                    classNames(
                      cls.item,
                      active && cls.active,
                      // item.disabled && cls.disabled,
                    )
                  }
                >
                  {item.content}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
