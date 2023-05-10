import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text';
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

  if (isLoading) {
    return (
      <div className={cls.commentsList}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    );
  }

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
        : <Text text={t('Комментарии отсутствуют') as string} />}
    </div>
  );
};
