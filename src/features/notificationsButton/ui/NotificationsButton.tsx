import classNames from 'shared/lib/classNames/classNames';
import NotificationsIcon from 'shared/assets/icons/bell.svg';
import { Popover } from 'shared/ui/Popover';
import { NotificationsList } from 'entities/Notification';
import { Button, ButtonTheme } from 'shared/ui/Button';
import cls from './NotificationsButton.module.scss';

interface NotificationsButtonProps {

}

export const NotificationsButton = (props: NotificationsButtonProps) => (
  <Popover
    trigger={(
      <Button theme={ButtonTheme.CLEAR}>
        <NotificationsIcon className={cls.notifications} />
      </Button>
    )}
  >
    <NotificationsList />
  </Popover>
);
