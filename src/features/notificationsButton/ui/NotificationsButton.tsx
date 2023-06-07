import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import NotificationsIcon from '@/shared/assets/icons/notification.svg';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popover';
import { NotificationsList } from '@/entities/Notification';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import cls from './NotificationsButton.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

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
        <Icon
          Svg={NotificationsIcon}
          clickable
          onClick={openDrawer}
        />
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
        <ToggleFeatures
          feature="isAppRedesigned"
          on={(
            <Popover
              className={cls.popoverRedesigned}
              direction='bottom left'
              trigger={trigger}
            >
              <NotificationsList />
            </Popover>
          )}
          off={(
            <PopoverDeprecated
              trigger={trigger}
            >
              <NotificationsList />
            </PopoverDeprecated>
          )}
        />

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
