import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleList, ArticleView } from '@/entities/Article';
import classNames from '@/shared/lib/classNames/classNames';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import cls from './ArticleRecommendationsList.module.scss';
import { ToggleFeatures } from '@/shared/features';

interface ArticleRecommendationsListProps {
    className?: string
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const {
    className,
  } = props;

  const { t } = useTranslation();

  const {
    data: articles, isLoading,
  } = useArticleRecommendationsList(3);

  return (
    <div className={classNames(
      cls.recommendations,
      className,
    )}
    >
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <Text
            size='l'
            className={cls.recommendations__title}
            title={t('Рекомендуем') as string}
          />
        )}
        off={(
          <TextDeprecated
            size={TextSize.L}
            className={cls.recommendations__title}
            title={t('Рекомендуем') as string}
          />
        )}
      />
      <ArticleList
        view={ArticleView.GRID}
        recommendations
        articles={articles}
        status={isLoading ? 'loading' : 'idle'}
        className={cls.recommendations__list}
        target='_blank'
      />
    </div>
  );
});
