import {
  createSlice, createEntityAdapter, PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import {
  ArticleRecommendationsSchema,
} from '../types/articleRecommendationsSchema';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articleRecommendations || recommendationsAdapter.getInitialState(),
);

const articleRecommendationsSlice = createSlice({
  name: 'articleDetailsRecommendations',
  initialState: recommendationsAdapter.getInitialState<ArticleRecommendationsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
        state.ids = [];
        state.entities = {};
      })
      .addCase(
        fetchArticleRecommendations.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false;
          state.error = undefined;
          recommendationsAdapter.setAll(state, action.payload);
        },
      )
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.ids = [];
        state.entities = {};
      });
  },
});

export const articleRecommendationsReducer = articleRecommendationsSlice.reducer;
