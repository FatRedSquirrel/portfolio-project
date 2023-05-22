import { EntityState } from '@reduxjs/toolkit';
import {
  Article, ArticleView, ArticleSortField, ArticleType,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/filter';

export interface ArticlesPageSchema extends EntityState<Article> {
  status: 'idle' | 'loading' | 'fetching' | 'error'
  initialItemIndex?: number
  error?: string

  // pagination
  page: number
  limit: number
  hasMore: boolean

  // filters
  view: ArticleView
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType

  _inited: boolean
}
