import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticlesList = createAsyncThunk<
  Article[], // return type,
  void, // func argument type,
  ThunkConfig<string>
>(
  'articles/fetchArticlesList',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const { data } = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
        },
      });

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
