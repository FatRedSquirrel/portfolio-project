import { useTranslation } from 'react-i18next';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Comment } from '../../model/types/comment';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';
import { ToggleFeatures } from '@/shared/features';

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
        {/* loading... */}
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
                comment={comment}
                isLoading={isLoading}
              />
            ))}
          </div>
        )
        : (
          <ToggleFeatures
            feature='isAppRedesigned'
            on={(
              <Text text={t('Комментарии отсутствуют') as string} />
            )}
            off={(
              <TextDeprecated text={t('Комментарии отсутствуют') as string} />
            )}
          />
        )}
    </div>
  );
};
