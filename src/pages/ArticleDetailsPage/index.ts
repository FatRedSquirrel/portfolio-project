export { ArticleDetailsPageAsync as ArticleDetailsPage } from './ui/ArticleDetailsPage/ArticleDetailsPage.async';
export type { ArticleCommentsSchema } from 'pages/ArticleDetailsPage/model/types/articleCommentsSchema';
export { getArticleCommentsIsLoading, getArticleCommentsError } from './model/selectors/comments';
export type {
  ArticleRecommendationsSchema,
} from 'pages/ArticleDetailsPage/model/types/articleRecommendationsSchema';
export { articleCommentsReducer } from 'pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice';
