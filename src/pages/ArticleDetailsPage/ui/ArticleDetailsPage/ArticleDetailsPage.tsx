import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { ArticleDetails } from '@/entities/Article';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articleCommentsReducer,
} from '@/pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';
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
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';

const reducers: ReducersList = {
  articleComments: articleCommentsReducer,
  articleRecommendations: articleRecommendationsReducer,
};

const ArticleDetailsPage = () => {
  const isArticleRecommendationsEnabled = getFeatureFlag('isArticleRecommendationsEnabled');

  const navigate = useNavigate();

  const { t } = useTranslation();

  const [rating, setRating] = useState(0);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <StickyContentLayout
            content={(
              <Page noInitialScroll>
                <DetailsContainer />
                <br />
                <Card padding='16'>
                  <VStack align='center' gap="16">
                    <Text title={rating ? t('Спасибо за оценку!') as string : t('Оцените статью') as string} />
                    <Rating
                      initialValue={rating}
                      onClick={(rate) => setRating(rate)}
                      transition
                      allowFraction
                    />
                  </VStack>
                </Card>
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
            <ArticleRating />
            <ArticleRecommendationsList />
            <ArticleComments />
          </Page>
        )}
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
