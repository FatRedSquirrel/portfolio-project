import {
  ArticleView, ArticleViewSelector, ArticleSortSelector, ArticleSortField, ArticleType,
} from 'entities/Article';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input';
import { SortOrder } from 'shared/types';
import { ChangeEvent } from 'react';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import useDebounce from 'shared/lib/hooks/useDebounce';
import { ArticleTypeTabs } from 'entities/Article/ui/ArticleTypeTabs/ArticleTypeTabs';
import { TabItem } from 'shared/ui/Tabs/ui/Tabs';
import {
  getArticlesPageOrder, getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import cls from './ArticlesPageFilters.module.scss';

export const ArticlesPageFilters = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const view = useSelector(getArticlesPageView);
  const sort = useSelector(getArticlesPageSort);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);

  const fetchData = () => {
    dispatch(fetchArticlesList({ replace: true }));
  };

  const debouncedFetchData = useDebounce(fetchData, 500);

  const changeView = (newView: ArticleView) => {
    dispatch(articlesPageActions.setView(newView));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  };

  const changeSort = (newSort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(newSort));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  };

  const changeOrder = (newOrder: SortOrder) => {
    dispatch(articlesPageActions.setOrder(newOrder));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  };

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(articlesPageActions.setSearch(e.target.value));
    dispatch(articlesPageActions.setPage(1));
    debouncedFetchData();
  };

  const changeType = (tab: TabItem<ArticleType>) => {
    dispatch(articlesPageActions.setType(tab.value as ArticleType));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  };

  return (
    <div className={cls.ArticlesPageFilters}>
      <div className={cls.sort}>
        <ArticleSortSelector
          sort={sort}
          order={order}
          changeSort={changeSort}
          changeOrder={changeOrder}
        />
        <ArticleViewSelector
          view={view}
          onViewClick={changeView}
        />
      </div>
      <Card>
        <Input
          value={search}
          onChange={changeSearch}
          placeholder={t('Поиск')}
        />
      </Card>
      <ArticleTypeTabs
        onTabClick={changeType}
      />
    </div>
  );
};