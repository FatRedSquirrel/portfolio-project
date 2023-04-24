import {
  createSlice, createEntityAdapter, PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { ArticleCommentsSchema } from 'pages/ArticleDetailsPage/model/types/articleCommentsSchema';
import { fetchArticleComments } from '../services/fetchArticleComments';

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleComments || commentsAdapter.getInitialState(),
);

const articleCommentsSlice = createSlice({
  name: 'articleComments',
  initialState: commentsAdapter.getInitialState<ArticleCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {
    addComment(state, action: PayloadAction<Comment>) {
      commentsAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleComments.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
        state.ids = [];
        state.entities = {};
      })
      .addCase(
        fetchArticleComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.isLoading = false;
          state.error = undefined;
          commentsAdapter.setAll(state, action.payload);
        },
      )
      .addCase(fetchArticleComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.ids = [];
        state.entities = {};
      });
  },
});

export const { addComment } = articleCommentsSlice.actions;
export const articleCommentsReducer = articleCommentsSlice.reducer;
