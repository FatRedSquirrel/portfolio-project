import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articlesPageActions } from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { getArticlesPageInited } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';

export const initArticlesPage = createAsyncThunk<
  void, // return type,
  void, // func argument type,
  ThunkConfig<string>
>(
  'articlesPage/initArticlesPage',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    const inited = getArticlesPageInited(getState());

    if (!inited) {
      dispatch(articlesPageActions.initState());
      dispatch(fetchArticlesList({ page: 1 }));
    }
  },
);
