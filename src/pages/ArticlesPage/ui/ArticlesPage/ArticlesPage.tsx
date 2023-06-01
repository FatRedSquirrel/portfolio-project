import { memo } from 'react';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import ArticlesInfiniteList from '../ArticlesInfiniteList/ArticlesInfiniteList';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = () => (
  <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
    <Page dataTestid='ArticlesPage'>
      <ArticlesInfiniteList />
      <ArticlePageGreeting />
    </Page>
  </DynamicModuleLoader>
);

export default memo(ArticlesPage);
