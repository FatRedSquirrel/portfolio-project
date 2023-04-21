import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationsIsLoading = (state: StateSchema) => state.articleRecommendations?.isLoading;
export const getArticleRecommendationsError = (state: StateSchema) => state.articleRecommendations?.error;
