import classNames from 'shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
}

export const ArticleList = (props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.GRID,
  } = props;

  const renderArticle = (article: Article) => (
    <ArticleListItem
      key={article.id}
      article={article}
      view={view}
    />
  );

  return (
    <div className={classNames(cls.ArticleList, className)}>
      {articles.length
        ? articles.map(renderArticle)
        : !isLoading && <div>нет статей</div>}
      {isLoading
        && (
          new Array(view === ArticleView.GRID ? 9 : 3)
            .fill(0)
            .map((item, index) => (
              <ArticleListItemSkeleton key={index} view={view} />
            ))
        )}
    </div>
  );
};
