import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlesPageLimit } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';

interface FetchArticlesListProps {
  page?: number
}

export const fetchArticlesList = createAsyncThunk<
  Article[], // return type,
  FetchArticlesListProps, // func argument type,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const { page = 1 } = props;
    const limit = getArticlesPageLimit(getState());

    try {
      const { data } = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
        },
      });

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
