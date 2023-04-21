import classNames from 'shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { Text, TextAlign } from 'shared/ui/Text';
import { TextSize } from 'shared/ui/Text/ui/Text';
import { HTMLAttributeAnchorTarget } from 'react';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
    target?: HTMLAttributeAnchorTarget
}

export const ArticleList = (props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.GRID,
    target,
  } = props;

  const renderArticle = (article: Article) => (
    <ArticleListItem
      key={article.id}
      article={article}
      view={view}
      target={target}
    />
  );

  return (
    <div className={classNames(cls.ArticleList, className)}>
      {articles.length
        ? articles.map(renderArticle)
        : !isLoading && <Text text="Нет статей" align={TextAlign.CENTER} size={TextSize.L} />}
      {isLoading
        && (
          new Array(view === ArticleView.GRID ? 9 : 3)
            .fill(Math.random())
            .map((_, index) => (
              <ArticleListItemSkeleton key={index} view={view} />
            ))
        )}
    </div>
  );
};
