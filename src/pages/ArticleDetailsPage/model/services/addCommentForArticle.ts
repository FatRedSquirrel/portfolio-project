import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { getUserAuthData, User } from '@/entities/User';
import { getArticlesDetailsData } from '@/entities/Article/model/selectors/articleDetails';
import { addComment } from '@/pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice';
import { fetchArticleComments } from './fetchArticleComments';

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

    try {
      const { data } = await extra.api.post<Comment>(
        'comments',
        {
          text: comment,
          articleId,
          userId: userData.id,
        },
      );

      if (!data) {
        throw new Error();
      }

      dispatch(addComment({
        ...data,
        user: userData,
      }));

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    } finally {
      // dispatch(fetchArticleComments(articleId));
    }
  },
);
