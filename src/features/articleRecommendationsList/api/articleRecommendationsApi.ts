import { rtkApi } from '@/shared/api/rtkApi';

const articleRecommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendations: build.query({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit,
          _expand: 'user',
        },
      }),
    }),
  }),
});

export const useArticleRecommendationsList = articleRecommendationsApi.useGetArticleRecommendationsQuery;
