import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import {
  getArticlesPageHasMore,
  getArticlesPageNum, getArticlesPageStatus,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';

export const fetchNextArticlesPage = createAsyncThunk<
  void, // return type,
  void, // func argument type,
  ThunkConfig<string>
>(
  'articlesPage/fetchNextArticlesPage',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getArticlesPageHasMore(getState());
    const page = getArticlesPageNum(getState());
    const status = getArticlesPageStatus(getState());

    if (hasMore && status === 'idle') {
      dispatch(articlesPageActions.setPage(page + 1));
      dispatch(fetchArticlesList({ replace: false }));
    }
  },
);
