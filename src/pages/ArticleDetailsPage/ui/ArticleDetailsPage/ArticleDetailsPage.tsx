import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
import { ToggleFeatures, getFeatureFlag } from '@/shared/features';
import cls from './ArticleDetailsPage.module.scss';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { DetailsContainer } from '../DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/ui/AdditionalInfoContainer';
import { Button } from '@/shared/ui/redesigned/Button';

const reducers: ReducersList = {
  articleComments: articleCommentsReducer,
  articleRecommendations: articleRecommendationsReducer,
};

const ArticleDetailsPage = () => {
  const isArticleRecommendationsEnabled = getFeatureFlag('isArticleRecommendationsEnabled');

  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <StickyContentLayout
            content={(
              <Page noInitialScroll>
                <DetailsContainer />
                <ArticleRating />
                <ArticleRecommendationsList />
                <ArticleComments />
              </Page>
            )}
            left={(
              <Button
                className={cls.backToArticles}
                onClick={() => navigate(-1)}
              >
                {t('К статьям')}
              </Button>
            )}
            right={(
              <AdditionalInfoContainer />
            )}
          />
        )}
        off={(
          <Page>
            <ArticleDetailsPageHeader />
            <ArticleDetails />
            <ToggleFeatures
              feature='isArticleRatingEnabled'
              on={<ArticleRating />}
              off={(
                <div className={cls.noRating}>
                  {t('Оценка статей скоро появится')}
                  !
                  (feature flags)
                </div>
              )}
            />
            <ArticleRecommendationsList />
            <ArticleComments />
          </Page>
        )}
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
