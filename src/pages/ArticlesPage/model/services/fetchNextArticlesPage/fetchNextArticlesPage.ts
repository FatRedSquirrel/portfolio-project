import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import {
  getArticlesPageHasMore, getArticlesPageIsLoading,
  getArticlesPageLimit,
  getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';

export const fetchNextArticlesPage = createAsyncThunk<
  void, // return type,
  void, // func argument type,
  ThunkConfig<string>
>(
  'articles/fetchNextArticlesPage',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getArticlesPageHasMore(getState());
    const page = getArticlesPageNum(getState());
    const isLoading = getArticlesPageIsLoading(getState());

    if (hasMore && !isLoading) {
      const newPage = page + 1;
      dispatch(articlesPageActions.setPage(newPage));
      dispatch(fetchArticlesList({ page: newPage }));
    }
  },
);
