import { HTMLAttributeAnchorTarget } from 'react';
import { useSelector } from 'react-redux';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { useTranslation } from 'react-i18next';
import classNames from '@/shared/lib/classNames/classNames';
import { fetchNextArticlesPage } from '@/pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ArticlesPageFilters } from '@/pages/ArticlesPage/ui/ArticlesPageFilters/ArticlesPageFilters';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
  getArticlesPageInitialItemIndex,
} from '@/pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { articlesPageActions } from '@/pages/ArticlesPage/model/slice/articlesPageSlice';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ToggleFeatures } from '@/shared/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleListProps {
    className?: string
    articles: Article[]
    status?: 'idle' | 'loading' | 'fetching' | 'error'
    view?: ArticleView
    target?: HTMLAttributeAnchorTarget
    recommendations?: boolean
}

export const ArticleList = (props: ArticleListProps) => {
  const {
    className,
    articles,
    status,
    view = ArticleView.LIST,
    target,
    recommendations = false,
  } = props;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const initialItemIndex = useSelector(getArticlesPageInitialItemIndex);

  const loadNextPart = () => {
    dispatch(fetchNextArticlesPage());
  };

  const getSkeletons = (type: 'loading' | 'fetching' = 'loading') => new Array(
    (view === ArticleView.GRID && type === 'loading') ? 12 : 3,
  )
    .fill(true)
    .map((_, index) => (
      <ArticleListItemSkeleton key={index} view={view} />
    ));

  // eslint-disable-next-line react/no-unstable-nested-components
  const Footer = () => {
    if ((!articles || !articles.length) && status === 'idle') {
      return <div>{t('нет статей')}</div>;
    }

    switch (status) {
    case 'fetching':
      return (
        <div className={cls.footer}>
          <Loader />
        </div>
      );
    case 'loading':
      return getSkeletons();
    default:
      return null;
    }
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Header = () => (
    <ArticlesPageFilters
      isLoading={status === 'loading'}
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

  if (recommendations && status === 'idle') {
    return (
      <div className={classNames(
        cls.ArticleList,
        cls.recommendations,
        cls[view],
        className,
      )}
      >
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

  if (status === 'loading') {
    return (
      <HStack
        wrap="wrap"
        gap="16"
        data-testid="ArticleList"
      >
        {getSkeletons().map((item) => item)}
      </HStack>
    );
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <HStack
          wrap="wrap"
          gap="16"
          data-testid="ArticleList"
        >
          {articles.map((item) => (
            <ArticleListItem
              article={item}
              view={view}
              target={target}
              key={item.id}
              className={cls.card}
            />
          ))}
          {status === 'fetching' && getSkeletons('fetching').map((item) => item)}
        </HStack>
      )}
      off={(
        view === ArticleView.GRID
          ? (
            <VirtuosoGrid
              style={{ height: '100%' }}
              data={articles}
              endReached={loadNextPart}
              itemContent={renderArticle}
              listClassName={classNames(
                cls.ArticleList,
                cls[view],
                className,
              )}
              components={{
                Header,
                Footer,
              }}
            />
          )
          : (
            <Virtuoso
              initialTopMostItemIndex={initialItemIndex}
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
      )}
    />
  );
};
