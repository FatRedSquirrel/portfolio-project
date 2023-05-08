import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from 'shared/ui/Text';
import { TextSize } from 'shared/ui/Text/ui/Text';
import { ArticleList } from 'entities/Article';
import classNames from 'shared/lib/classNames/classNames';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import cls from './ArticleRecommendationsList.module.scss';

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
      <Text
        size={TextSize.L}
        className={cls.recommendations__title}
        title={t('Рекомендуем')}
      />
      <ArticleList
        recommendations
        articles={articles}
        status={isLoading ? 'loading' : 'idle'}
        className={cls.recommendations__list}
        target='_blank'
      />
    </div>
  );
});
