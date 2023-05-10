export { ArticleDetailsPageAsync as ArticleDetailsPage } from './ui/ArticleDetailsPage/ArticleDetailsPage.async';
export type { ArticleCommentsSchema } from './model/types/articleCommentsSchema';
export { getArticleCommentsIsLoading, getArticleCommentsError } from './model/selectors/comments';
export type {
  ArticleRecommendationsSchema,
} from './model/types/articleRecommendationsSchema';
export { articleCommentsReducer } from './model/slice/articleDetailsCommentsSlice';
