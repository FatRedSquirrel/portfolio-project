import { ArticleList } from 'entities/Article';
import { getArticlesPageError, getArticlesPageStatus, getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
import { getArticles } from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Text } from 'shared/ui/Text';

const ArticlesInfiniteList = () => {
  const dispatch = useAppDispatch();

  const articles = useSelector(getArticles.selectAll);
  const view = useSelector(getArticlesPageView);
  const status = useSelector(getArticlesPageStatus);
  const error = useSelector(getArticlesPageError);

  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, []);

  if (error) {
    return (
      <Text
        title='Произошла ошибка при загрузке статей'
        text='Попробуйте перезагрузить страницу'
      />
    );
  }

  return (
    <ArticleList
      status={status}
      view={view}
      articles={articles}
    />
  );
};

export default ArticlesInfiniteList;
