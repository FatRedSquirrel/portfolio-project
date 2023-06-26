import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { getArticlesDetailsData } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';
import { getRouteArticlesEdit } from '@/shared/const/router';

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticlesDetailsData);

  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticlesEdit(article.id));
    }
  }, [article, navigate]);

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
