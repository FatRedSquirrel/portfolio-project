import { useTranslation } from 'react-i18next';
import classNames from '@/shared/lib/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/ui/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { useNotifications } from '../../api/notificationsApi';
import cls from './NotificationsList.module.scss';
import { NotificationsItem } from '../NotificationsItem/NotificationsItem';
import { toggleFeatures } from '@/shared/features';

interface NotificationsListProps {
  className?: string
}

export const NotificationsList = (props: NotificationsListProps) => {
  const {
    className,
  } = props;

  const { t } = useTranslation();

  const {
    data: notifications, isLoading,
  } = useNotifications(null, {
    pollingInterval: 5000,
  });

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
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
        <div className={cls.empty}>
          {t('Нет уведомлений')}
        </div>
      )}
    </div>
  );
};
