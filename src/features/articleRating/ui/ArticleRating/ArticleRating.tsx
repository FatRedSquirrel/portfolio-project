import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import cls from './ArticleRating.module.scss';
import { Rating } from '@/entities/Rating';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { getArticlesDetailsData } from '@/entities/Article';
import { Skeleton } from '@/shared/ui/Skeleton/ui/Skeleton';

interface ArticleRatingProps {
    className?: string;
}

export const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const userData = useSelector(getUserAuthData);
  const articleData = useSelector(getArticlesDetailsData);

  const [rateArticle] = useRateArticle();

  const { data, isLoading } = useGetArticleRating({
    userId: userData?.id ?? '',
    articleId: articleData?.id ?? '',
  });

  if (isLoading) {
    return <Skeleton width='100%' height={120} />;
  }

  const rating = data?.[0];

  const handleRateArticle = (starsCount: number, feedback?: string) => {
    try {
      rateArticle({
        userId: userData!.id,
        articleId: articleData!.id,
        rate: starsCount,
        feedback,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onCancel = (starsCount: number) => {
    handleRateArticle(starsCount);
  };

  const onAccept = (starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback);
  };

  return (
    <Rating
      onCancel={onCancel}
      onAccept={onAccept}
      rate={rating?.rate}
      className={cls.rating}
      title={rating ? 'Рейтинг статьи' : 'Оцените статью'}
      feedbackTitle='Оставьте свой отзыв о статье'
    />
  );
});
