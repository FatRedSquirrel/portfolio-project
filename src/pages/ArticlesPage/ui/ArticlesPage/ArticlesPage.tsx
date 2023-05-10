import { memo } from 'react';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import ArticlesInfiniteList from '../ArticlesInfiniteList/ArticlesInfiniteList';

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = () => (
  <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
    <Page>
      <ArticlesInfiniteList />
    </Page>
  </DynamicModuleLoader>
);

export default memo(ArticlesPage);
