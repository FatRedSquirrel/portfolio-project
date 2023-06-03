import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import NotificationsIcon from '@/shared/assets/icons/notification.svg';
import { Popover } from '@/shared/ui/deprecated/Popover';
import { NotificationsList } from '@/entities/Notification';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import cls from './NotificationsButton.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { Button } from '@/shared/ui/redesigned/Button';

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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <Button
          variant='clear'
          className={cls.trigger}
          onClick={openDrawer}
        >
          <NotificationsIcon className={cls.notifications} />
        </Button>
      )}
      off={(
        <ButtonDeprecated
          theme={ButtonTheme.CLEAR}
          onClick={openDrawer}
        >
          <NotificationsIcon className={cls.notifications} />
        </ButtonDeprecated>
      )}
    />
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
