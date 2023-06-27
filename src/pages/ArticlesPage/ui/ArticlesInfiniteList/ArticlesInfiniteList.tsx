import { useSelector } from 'react-redux';
import { ArticleList } from '@/entities/Article';
import { getArticlesPageError, getArticlesPageStatus, getArticlesPageView } from '@/pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { getArticles } from '@/pages/ArticlesPage/model/slice/articlesPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Text } from '@/shared/ui/deprecated/Text';

const ArticlesInfiniteList = () => {
  const dispatch = useAppDispatch();

  const articles = useSelector(getArticles.selectAll);
  const view = useSelector(getArticlesPageView);
  const status = useSelector(getArticlesPageStatus);
  const error = useSelector(getArticlesPageError);

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
