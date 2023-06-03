import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from '@/shared/lib/classNames/classNames';
import { AddCommentFormStatus } from '@/entities/addCommentForm/model/types/addCommentForm';
import { Text } from '@/shared/ui/deprecated/Text';
import { TextSize } from '@/shared/ui/deprecated/Text/ui/Text';
import { CommentList } from '@/entities/Comment';
import { getArticleComments } from '@/pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '@/pages/ArticleDetailsPage';
import { AddCommentForm, getAddCommentFormStatus } from '@/entities/addCommentForm';
import { addCommentForArticle } from '@/pages/ArticleDetailsPage/model/services/addCommentForArticle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { fetchArticleComments } from '@/pages/ArticleDetailsPage/model/services/fetchArticleComments';
import cls from './ArticleComments.module.scss';

interface ArticleCommentsProps {
    className?: string;
}

export const ArticleComments = memo((props: ArticleCommentsProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{id: string}>();

  const dispatch = useAppDispatch();

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const commentFormStatus = useSelector(getAddCommentFormStatus);

  const sendComment = useCallback((comment: string) => {
    dispatch(addCommentForArticle(comment));
  }, [dispatch]);

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchArticleComments(id));
    }
  }, [id]);

  return (
    <div
      className={
        classNames(
          cls.comments,
          commentFormStatus === AddCommentFormStatus.SENDING && cls.disabled,
          className,
        )
      }
    >
      <Text
        size={TextSize.L}
        className={cls.comments__title}
        title={t('Комментарии') as string}
      />
      <AddCommentForm sendComment={sendComment} />
      <CommentList
        isLoading={commentsIsLoading}
        comments={comments}
      />
    </div>
  );
});
