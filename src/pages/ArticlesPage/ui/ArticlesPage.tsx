import { memo } from 'react';
import { ArticleList, ArticleView } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList';
import { useSelector } from 'react-redux';
import {
  getArticlesPageError,
  getArticlesPageIsLoading, getArticlesPageView,
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { Text } from 'shared/ui/Text';
import { ArticleViewSelector } from 'entities/Article/ui/ArticleViewSelector/ArticleViewSelector';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlesPageSlice';

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = () => {
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(fetchArticlesList());
    dispatch(articlesPageActions.initState());
  });

  const articles = useSelector(getArticles.selectAll);
  const view = useSelector(getArticlesPageView);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);

  const changeView = (newView: ArticleView) => {
    dispatch(articlesPageActions.setView(newView));
  };

  if (error) {
    return (
      <Text
        title='Произошла ошибка при загрузке статей'
        text='Попробуйте перезагрузить страницу'
      />
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div>
        <ArticleViewSelector
          view={view}
          onViewClick={changeView}
        />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
