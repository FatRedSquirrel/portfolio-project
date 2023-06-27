import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import ArticlesInfiniteList from '../ArticlesInfiniteList/ArticlesInfiniteList';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ToggleFeatures } from '@/shared/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const loadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, []);

  return (
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
              <Page
                dataTestid='ArticlesPage'
                onScrollEnd={loadNextPart}
              >
                <ArticlesInfiniteList />
                <ArticlePageGreeting />
              </Page>
            )}
          />
        )}
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
