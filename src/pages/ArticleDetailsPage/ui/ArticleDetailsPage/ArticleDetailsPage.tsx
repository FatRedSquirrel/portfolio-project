import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articleCommentsReducer,
} from '@/pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice';
import { Page } from '@/widgets/Page';
import {
  ArticleDetailsPageHeader,
} from '@/pages/ArticleDetailsPage/ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleComments } from '@/features/articleComments';
import {
  articleRecommendationsReducer,
} from '../../model/slice/articleRecommendationsSlice';
import { ArticleRating } from '@/features/articleRating';
import { getFeatureFlag } from '@/shared/features';

const reducers: ReducersList = {
  articleComments: articleCommentsReducer,
  articleRecommendations: articleRecommendationsReducer,
};

const ArticleDetailsPage = () => {
  const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');
  const isArticleRecommendationsEnabled = getFeatureFlag('isArticleRecommendationsEnabled');

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page>
        <ArticleDetailsPageHeader />
        <ArticleDetails />
        {isArticleRatingEnabled && <ArticleRating />}
        {isArticleRecommendationsEnabled && <ArticleRecommendationsList />}
        <ArticleComments />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
