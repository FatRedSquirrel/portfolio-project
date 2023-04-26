import classNames from 'shared/lib/classNames/classNames';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { getArticlesDetailsData } from 'entities/Article';
import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
    className?: string
}

export const ArticleDetailsPageHeader = (props: ArticleDetailsPageHeaderProps) => {
  const { className } = props;

  const article = useSelector(getArticlesDetailsData);
  const canEdit = useSelector(getCanEditArticle);

  return (
    <header className={classNames(cls.header, className)}>
      <AppLink
        theme={AppLinkTheme.OUTLINED}
        to={RoutePath.articles}
      >
        К списку статей
      </AppLink>
      {canEdit
        && (
          <AppLink
            theme={AppLinkTheme.OUTLINED}
            to={`${RoutePath.article_details}${article?.id}/edit`}
          >
            Редактировать
          </AppLink>
        )}
    </header>
  );
};
