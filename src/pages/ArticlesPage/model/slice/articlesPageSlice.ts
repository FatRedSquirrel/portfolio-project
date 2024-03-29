import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticleType, ArticleView } from '@/entities/Article';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { ArticleSortField } from '@/entities/Article/model/types/article';
import { SortOrder } from '@/shared/types/filter';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/articlesPageSchema';

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
  name: 'articlesPageSlice',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    status: 'idle',
    ids: [],
    entities: {},
    view: ArticleView.LIST,
    page: 1,
    hasMore: true,
    _inited: false,
    limit: 4,
    sort: ArticleSortField.CREATED,
    search: '',
    order: 'asc',
    type: ArticleType.ALL,
  }),
  reducers: {
    setView(state, action: PayloadAction<ArticleView>) {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setOrder(state, action: PayloadAction<SortOrder>) {
      state.order = action.payload;
    },
    setSort(state, action: PayloadAction<ArticleSortField>) {
      state.sort = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setType(state, action: PayloadAction<ArticleType>) {
      state.type = action.payload;
    },
    setInitialItemIndex(state, action: PayloadAction<number>) {
      state.initialItemIndex = action.payload;
    },
    initState(state) {
      const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
      state.view = view;
      state.limit = 4;
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.status = 'fetching';
        state.error = undefined;

        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state);
          state.status = 'loading';
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = undefined;
        state.hasMore = action.payload.length >= state.limit;

        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload);
        } else {
          articlesAdapter.addMany(state, action.payload);
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
