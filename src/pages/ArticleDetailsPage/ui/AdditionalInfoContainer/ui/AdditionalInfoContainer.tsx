import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { getArticlesDetailsData } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';
import { getRouteArticlesEdit } from '@/shared/const/router';
import { getArticlesDetailsIsLoading } from '@/entities/Article/model/selectors/articleDetails';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticlesDetailsData);
  const isLoading = useSelector(getArticlesDetailsIsLoading);

  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticlesEdit(article.id));
    }
  }, [article, navigate]);

  if (isLoading) {
    return (
      <Skeleton width={264} height={212} border='40px' />
    );
  }

  if (!article) {
    return null;
  }

  return (
    <Card padding="24" border="round" className={cls.card}>
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  );
});
