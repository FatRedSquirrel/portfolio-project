import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchArticleComments = createAsyncThunk<
  Comment[], // return type
  string | undefined, // func argument type
  ThunkConfig<string>
>(
  'articleDetails/fetchArticleComments',
  async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!articleId) {
      return rejectWithValue('error');
    }

    try {
      const { data } = await extra.api.get<Comment[]>('comments', {
        params: {
          articleId,
          _expand: 'user',
        },
      });

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
