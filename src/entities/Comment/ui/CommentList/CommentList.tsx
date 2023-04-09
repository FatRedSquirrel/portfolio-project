import { Skeleton } from 'shared/ui/Skeleton/ui/Skeleton';
import { Text } from 'shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { Comment } from '../../model/types/comment';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = (props: CommentListProps) => {
  const {
    className,
    comments,
    isLoading,
  } = props;

  const { t } = useTranslation();

  return (
    <div>
      {comments?.length
        ? (
          <div className={cls.commentsList}>
            {comments?.map((comment) => (
              <CommentCard
                key={comment.id}
                className={cls.comment}
                comment={comment}
                isLoading={isLoading}
              />
            ))}
          </div>
        )
        : <Text text={t('Комментарии отсутствуют')} />}
    </div>
  );
};
