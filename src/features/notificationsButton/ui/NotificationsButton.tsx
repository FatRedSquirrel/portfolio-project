import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import NotificationsIcon from '@/shared/assets/icons/notification.svg';
import { Popover } from '@/shared/ui/deprecated/Popover';
import { NotificationsList } from '@/entities/Notification';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import cls from './NotificationsButton.module.scss';

interface NotificationsButtonProps { }

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
