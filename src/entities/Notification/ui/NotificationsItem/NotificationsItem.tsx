import { memo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './NotificationsItem.module.scss';
import { Notification } from '../../model/types/notifications';
import { ToggleFeatures, toggleFeatures } from '@/shared/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationsItem = memo((props: NotificationItemProps) => {
  const { className, item } = props;

  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Card
          className={classNames(
            cls.NotificationItem,
            className,
          )}
        >
          <Text
            title={item.title}
            text={item.description}
            size='s'
          />
        </Card>
      )}
      off={(
        <CardDeprecated
          theme={CardTheme.OUTLINED}
          className={classNames(
            cls.NotificationItem,
            className,
          )}
        >
          <TextDeprecated
            className={cls.text}
            title={item.title}
            text={item.description}
          />
        </CardDeprecated>
      )}
    />
  );

  if (item.href) {
    return (
      <a
        className={toggleFeatures({
          name: 'isAppRedesigned',
          on: () => cls.link,
          off: () => undefined,
        })}
        target="_blank"
        href={item.href}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
});
