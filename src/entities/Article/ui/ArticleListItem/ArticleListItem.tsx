import { CSSProperties, HTMLAttributeAnchorTarget, memo } from 'react';
import { ArticleView, Article } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/features';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
  style?: CSSProperties
  className?: string;
  article: Article
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
  setInitialItemIndex?: () => void
}

export const ArticleListItem = memo((props: ArticleListItemProps) => (
  <ToggleFeatures
    feature="isAppRedesigned"
    on={<ArticleListItemRedesigned {...props} />}
    off={<ArticleListItemDeprecated {...props} />}
  />
));
