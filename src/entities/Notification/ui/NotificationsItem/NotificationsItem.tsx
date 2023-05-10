import classNames from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { AppLink } from '@/shared/ui/AppLink';
import { Notification } from '../../model/types/notifications';
import cls from './NotificationsItem.module.scss';

interface NotificationsItemProps {
  className?: string
  item: Notification
}

const NotificationsItem = (props: NotificationsItemProps) => {
  const {
    className,
    item,
  } = props;

  return (
    <AppLink
      to={item.href ?? '#'}
      className={classNames(
        cls.item,
        className,
      )}
    >
      <Text
        title={item.title}
        text={item.description}
        className={cls.item__text}
      />
    </AppLink>
  );
};

export default NotificationsItem;
