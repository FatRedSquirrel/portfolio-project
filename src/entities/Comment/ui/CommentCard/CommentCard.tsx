import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { RoutePath } from '@/shared/const/router';
import classNames from '@/shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface CommentProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
}

export const CommentCard = (props: CommentProps) => {
  const {
    className,
    comment,
    isLoading,
  } = props;

  if (isLoading) {
    return (
      <div className={classNames(cls.comment, cls.noBorder)}>
        <div className={cls.comment__header}>
          <Skeleton width={30} height={30} round />
          <Skeleton width={150} height={20} />
        </div>
        <Skeleton width='100%' height={40} />
      </div>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <div className={cls.comment}>
      <AppLink to={`${RoutePath.profile}/${comment.user.id}`} className={cls.comment__header}>
        {comment.user.avatar
          ? <Avatar size={40} src={comment.user.avatar} />
          : <Avatar size={40} empty />}
        <Text title={comment.user.username} />
      </AppLink>
      <Text text={comment.text} />
    </div>
  );
};
