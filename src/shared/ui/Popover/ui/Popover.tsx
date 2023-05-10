import { Popover as HPopover, Transition } from '@headlessui/react';
import { ReactNode } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import cls from './Popover.module.scss';

interface PopoverProps {
  className?: string
  direction?: 'left' | 'right'
  trigger: ReactNode
  children: ReactNode
}

export const Popover = (props: PopoverProps) => {
  const {
    className,
    direction = 'left',
    trigger,
    children,
  } = props;

  return (
    <HPopover className={classNames(
      cls.popover,
      className,
    )}
    >
      <HPopover.Button
        className={cls.trigger}
      >
        {trigger}
      </HPopover.Button>
      <Transition
        enter={cls.enter}
        enterFrom={cls.enterFrom}
        enterTo={cls.enterTo}
        leave={cls.leave}
        leaveFrom={cls.leaveFrom}
        leaveTo={cls.leaveTo}
      >
        <HPopover.Panel className={classNames(
          cls.popover__panel,
          cls[direction],
        )}
        >
          {children}
        </HPopover.Panel>
      </Transition>
    </HPopover>
  );
};
