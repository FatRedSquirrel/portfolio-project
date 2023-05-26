import { ReactElement, memo } from 'react';
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
import { getFeatureFlag, toggleFeatures } from '@/shared/features';

const reducers: ReducersList = {
  articleComments: articleCommentsReducer,
  articleRecommendations: articleRecommendationsReducer,
};

const rating = toggleFeatures<ReactElement>({
  name: 'isArticleRatingEnabled',
  on: () => <ArticleRating />,
  off: () => <div>нет рейтинга</div>,
});

const ArticleDetailsPage = () => {
  const isArticleRecommendationsEnabled = getFeatureFlag('isArticleRecommendationsEnabled');

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page>
        <ArticleDetailsPageHeader />
        <ArticleDetails />
        {rating}
        {isArticleRecommendationsEnabled && <ArticleRecommendationsList />}
        <ArticleComments />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
