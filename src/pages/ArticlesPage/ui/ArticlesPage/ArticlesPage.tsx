import { memo } from 'react';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import ArticlesInfiniteList from '../ArticlesInfiniteList/ArticlesInfiniteList';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ToggleFeatures } from '@/shared/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = () => (
  <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
    <ToggleFeatures
      feature='isAppRedesigned'
      off={(
        <Page dataTestid='ArticlesPage'>
          <ArticlesInfiniteList />
          <ArticlePageGreeting />
        </Page>
      )}
      on={(
        <StickyContentLayout
          left={<ViewSelectorContainer />}
          right={<FiltersContainer />}
          content={(
            <Page dataTestid='ArticlesPage'>
              <ArticlesInfiniteList />
              <ArticlePageGreeting />
            </Page>
          )}
        />

      )}
    />
  </DynamicModuleLoader>
);

export default memo(ArticlesPage);
