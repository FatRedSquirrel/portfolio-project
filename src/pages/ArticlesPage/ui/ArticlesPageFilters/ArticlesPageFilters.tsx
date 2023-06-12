import { useTranslation } from 'react-i18next';
import { ArticleViewSelector, ArticleSortSelector } from '@/entities/Article';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPageFilters.module.scss';
import { useArticleFilters } from '../../lib/useArticleFilters';

interface ArticlesPageFiltersProps {
  className?: string
  isLoading?: boolean
}

export const ArticlesPageFilters = (props: ArticlesPageFiltersProps) => {
  const {
    className,
    isLoading,
  } = props;

  const { t } = useTranslation();

  const {
    sort,
    order,
    type,
    onChangeSort: changeSort,
    onChangeOrder: changeOrder,
    view,
    onChangeView: changeView,
    search,
    onChangeSearch: changeSearch,
    onChangeType: changeType,
  } = useArticleFilters();

  return (
    <div
      className={
        classNames(
          cls.ArticlesPageFilters,
          isLoading && cls.loading,
          className,
        )
      }
    >
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
          placeholder={t('Поиск') as string}
        />
      </Card>
      <ArticleTypeTabs
        className={cls.tabs}
        value={type}
        onChangeType={changeType}
      />
    </div>
  );
};
