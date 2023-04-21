import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articleCommentsReducer,
  getArticleComments,
} from 'pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice';
import { useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { fetchArticleComments } from 'pages/ArticleDetailsPage/model/services/fetchArticleComments';
import { AddCommentForm } from 'features/addCommentForm';
import { addCommentForArticle } from 'pages/ArticleDetailsPage/model/services/addCommentForArticle';
import { Button } from 'shared/ui/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page';
import { getArticleRecommendationsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/recommendations';
import { TextSize } from 'shared/ui/Text/ui/Text';
import { fetchArticleRecommendations } from 'pages/ArticleDetailsPage/model/services/fetchArticleRecommendations';
import { getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import cls from './ArticleDetailsPage.module.scss';
import {
  articleRecommendationsReducer,
  getArticleRecommendations,
} from '../../model/slice/articleRecommendationsSlice';

const reducers: ReducersList = {
  articleComments: articleCommentsReducer,
  articleRecommendations: articleRecommendationsReducer,
};

const ArticleDetailsPage = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation('article');

  const navigate = useNavigate();

  const { id } = useParams<{id: string}>();

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
  const view = useSelector(getArticlesPageView);

  const backToArticles = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const sendComment = useCallback((comment: string) => {
    dispatch(addCommentForArticle(comment));
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(fetchArticleComments(id));
    dispatch(fetchArticleRecommendations());
  }, [id]);

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
        <div className={cls.recommendations}>
          <Text
            size={TextSize.L}
            className={cls.recommendations__title}
            title={t('Рекомендуем')}
          />
          <ArticleList
            articles={recommendations}
            isLoading={recommendationsIsLoading}
            className={cls.recommendations__list}
            target='_blank'
          />
        </div>
        <div className={cls.comments}>
          <Text
            size={TextSize.L}
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
