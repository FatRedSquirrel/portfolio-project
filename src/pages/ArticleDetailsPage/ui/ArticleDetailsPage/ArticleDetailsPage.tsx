import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsCommentsReducer, getArticleComments } from 'pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice';
import { useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId';
import { AddCommentForm } from 'features/addCommentForm';
import { addCommentForArticle } from 'pages/ArticleDetailsPage/model/services/addCommentForArticle';
import { Button } from 'shared/ui/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'shared/ui/Page/Page';
import cls from './ArticleDetailsPage.module.scss';

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation('article');

  const navigate = useNavigate();

  const { id } = useParams<{id: string}>();

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

  const backToArticles = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const sendComment = useCallback((comment: string) => {
    dispatch(addCommentForArticle(comment));
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  if (!id) {
    return (
      <div>
        {t('Статья не найдена')}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page>
        <Button onClick={backToArticles}>
          Назад к списку статей
        </Button>
        <ArticleDetails id={id} />
        <div className={cls.comments}>
          <Text
            className={cls.comments__title}
            title={t('Комментарии')}
          />
          <AddCommentForm sendComment={sendComment} />
          <CommentList
            isLoading={commentsIsLoading}
            comments={comments}
          />
        </div>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
