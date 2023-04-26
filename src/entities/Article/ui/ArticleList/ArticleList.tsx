import classNames from 'shared/lib/classNames/classNames';
import { HTMLAttributeAnchorTarget, useRef } from 'react';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { ArticlesPageFilters } from 'pages/ArticlesPage/ui/ArticlesPageFilters/ArticlesPageFilters';
import { Loader } from 'shared/ui/Loader';
import { useSelector } from 'react-redux';
import {
  getArticlesPageInitialItemIndex,
  getArticlesPageStatus,
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { articlesPageActions } from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
    target?: HTMLAttributeAnchorTarget
  recommendations?: boolean
}

export const ArticleList = (props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.GRID,
    target,
    recommendations = false,
  } = props;

  const dispatch = useAppDispatch();
  const status = useSelector(getArticlesPageStatus);
  const initialItemIndex = useSelector(getArticlesPageInitialItemIndex);

  const virtuoso = useRef(null);

  const loadNextPart = () => {
    dispatch(fetchNextArticlesPage());
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Footer = () => {
    switch (status) {
    case 'fetching':
      return (
        <div className={cls.footer}>
          <Loader />
        </div>
      );
    case 'loading':
      return (
        <div className={classNames(cls.ArticleList, cls[view])}>
          {
            new Array(view === ArticleView.GRID ? 4 : 3)
              .fill(Math.random())
              .map((_, index) => (
                <ArticleListItemSkeleton key={index} view={view} />
              ))
          }
        </div>
      );
    default:
      return null;
    }
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Header = () => (
    <ArticlesPageFilters
      isLoading={isLoading}
    />
  );

  const setInitialItemIndex = (index: number) => {
    dispatch(articlesPageActions.setInitialItemIndex(index));
  };

  const renderArticle = (index: number, article: Article) => (
    <ArticleListItem
      key={index}
      article={article}
      view={view}
      target={target}
      setInitialItemIndex={() => setInitialItemIndex(index)}
    />
  );

  if (recommendations) {
    return (
      <div className={classNames(cls.ArticleList, cls.recommendations, cls[view])}>
        {articles.map((article) => (
          <ArticleListItem
            key={article.id}
            article={article}
            target={target}
            view={view}
          />
        ))}
      </div>
    );
  }

  return (
    view === ArticleView.GRID
      ? (
        <VirtuosoGrid
          ref={virtuoso}
          style={{ height: '100%' }}
          data={articles}
          endReached={loadNextPart}
          itemContent={renderArticle}
          listClassName={classNames(cls.ArticleList, cls[view])}
          components={{
            Header,
            Footer,
          }}
        />
      )

      : (
        <Virtuoso
          initialTopMostItemIndex={initialItemIndex}
          ref={virtuoso}
          style={{ height: '100%' }}
          data={articles}
          endReached={loadNextPart}
          itemContent={renderArticle}
          components={{
            Header,
            Footer,
          }}
        />
      )
  );
};
