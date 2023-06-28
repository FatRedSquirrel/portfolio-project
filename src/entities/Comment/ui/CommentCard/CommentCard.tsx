import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/ui/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { AppLink as AppLinkRedesigned } from '@/shared/ui/redesigned/AppLink';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { getRouteProfile } from '@/shared/const/router';
import classNames from '@/shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentProps {
  comment?: Comment
  isLoading?: boolean
}

export const CommentCard = (props: CommentProps) => {
  const {
    comment,
    isLoading,
  } = props;

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  const AppLink = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => AppLinkRedesigned,
    off: () => AppLinkDeprecated,
  });

  if (isLoading) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <Card padding='16'>
            <div className={cls.comment__header}>
              <Skeleton width={40} height={40} border='100%' />
              <Skeleton width={150} height={30} border='5px' />
            </div>
            <Skeleton width='100%' height={60} border='5px' />
          </Card>
        )}
        off={(
          <div className={classNames(cls.comment, cls.noBorder)}>
            <div className={cls.comment__header}>
              <Skeleton width={30} height={30} round />
              <Skeleton width={150} height={20} />
            </div>
            <Skeleton width='100%' height={40} />
          </div>
        )}
      />
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <Card padding='16'>
          <AppLink to={getRouteProfile(comment.user.id)} className={cls.comment__header}>
            <Avatar size={40} src={comment.user.avatar} />
            <Text title={comment.user.username} />
          </AppLink>
          <Text className={cls.comment__text} text={comment.text} />
        </Card>
      )}
      off={(
        <div className={cls.comment}>
          <AppLink to={getRouteProfile(comment.user.id)} className={cls.header}>
            <AvatarDeprecated size={40} src={comment.user.avatar} />
            <TextDeprecated title={comment.user.username} />
          </AppLink>
          <TextDeprecated text={comment.text} />
        </div>
      )}
    />
  );
};
