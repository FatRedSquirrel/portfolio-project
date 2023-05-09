import classNames from 'shared/lib/classNames/classNames';
import NotificationsIcon from 'shared/assets/icons/bell.svg';
import { Popover } from 'shared/ui/Popover';
import { NotificationsList } from 'entities/Notification';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Drawer } from 'shared/ui/Drawer';
import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import cls from './NotificationsButton.module.scss';

interface NotificationsButtonProps {}

export const NotificationsButton = (props: NotificationsButtonProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const trigger = (
    <Button
      theme={ButtonTheme.CLEAR}
      onClick={openDrawer}
    >
      <NotificationsIcon className={cls.notifications} />
    </Button>
  );

  return (
    <>
      <BrowserView>
        <Popover
          trigger={trigger}
        >
          <NotificationsList />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={drawerOpen} onClose={closeDrawer}>
          <NotificationsList />
        </Drawer>
      </MobileView>
    </>
  );
};
