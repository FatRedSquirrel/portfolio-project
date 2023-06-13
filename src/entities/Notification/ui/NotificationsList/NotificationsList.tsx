import classNames from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/ui/Skeleton';
import { useNotifications } from '../../api/notificationsApi';
import cls from './NotificationsList.module.scss';
import { NotificationsItem } from '../NotificationsItem/NotificationsItem';

interface NotificationsListProps {
  className?: string
}

export const NotificationsList = (props: NotificationsListProps) => {
  const {
    className,
  } = props;

  const {
    data: notifications, isLoading,
  } = useNotifications(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <div className={classNames(
        cls.listLoading,
        className,
      )}
      >
        <Skeleton width='100%' height='60px' border='12px' />
        <Skeleton width='100%' height='60px' border='12px' />
        <Skeleton width='100%' height='60px' border='12px' />
      </div>
    );
  }

  return (
    <div className={classNames(
      cls.list,
      className,
    )}
    >
      {(notifications && notifications.length) ? (
        notifications.map((item) => (
          <NotificationsItem
            key={item.id}
            item={item}
          />
        ))
      ) : (
        <div className={cls.empty}>нет уведомлений</div>
      )}
    </div>
  );
};
