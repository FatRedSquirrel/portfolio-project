import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getArticlesDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
  Comment, // return type
  string, // func argument type
  ThunkConfig<string>
>(
  'articleDetails/addCommentForArticle',
  async (comment, thunkApi) => {
    const {
      extra, rejectWithValue, getState, dispatch,
    } = thunkApi;

    const userData = getUserAuthData(getState());
    const articleId = getArticlesDetailsData(getState())?.id;

    if (!userData || !comment || !articleId) {
      return rejectWithValue('no data');
    }

    dispatch(fetchCommentsByArticleId(articleId));

    try {
      const { data } = await extra.api.post<Comment>('comments', {
        text: comment,
        articleId,
        userId: userData.id,
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
