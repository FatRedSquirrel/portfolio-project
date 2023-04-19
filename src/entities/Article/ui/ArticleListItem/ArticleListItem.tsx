import classNames from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Card } from 'shared/ui/Card/Card';
import useHover from 'shared/lib/hooks/useHover';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import TextBlock from '../components/TextBlock';
import {
  Article, ArticleBlockText, ArticleBlockType, ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
  article: Article
  view: ArticleView
}

export const ArticleListItem = (props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
  } = props;

  const [isHovered, bindHover] = useHover();
  const navigate = useNavigate();

  const openArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}/${article.id}`);
  }, [article.id, navigate]);

  const types = useMemo(() => (
    <Text text={article.type.join(', ')} className={cls.type} />
  ), [article.type]);

  const views = useMemo(() => (
    <div className={cls.viewsWrapper}>
      <Text text={String(article.views)} className={cls.views} />
      <EyeIcon />
    </div>
  ), [article.views]);

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleBlockText;

    return (
      <div
        {...bindHover}
        className={classNames(className, cls[view])}
      >
        <Card>
          <div className={cls.header}>
            <div className={cls.user}>
              <Avatar size={30} src={article.user.avatar} />
              <Text className={cls.username} text={article.user.username} />
            </div>
            <Text className={cls.date} text={article.createdAt} />
          </div>
          <Text title={article.title} />
          <div className={cls.types}>
            {article.type.map((type) => (
              <Text key={type} text={type} />
            ))}
          </div>
          <div className={cls.image}>
            <img src={article.img} alt="" />
          </div>
          {textBlock
            && (
              <div className={cls.text}>
                <TextBlock block={textBlock} />
              </div>
            )}
          <div className={cls.footer}>
            <Button onClick={openArticle}>
              Читать далее...
            </Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      {...bindHover}
      className={classNames(className, cls[view])}
      onClick={openArticle}
    >
      <Card>
        <div className={cls.image}>
          <img src={article.img} alt="" />
          {isHovered && <Text text={article.createdAt} className={cls.date} />}
        </div>
        <div className={cls.info}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </div>
  );
};