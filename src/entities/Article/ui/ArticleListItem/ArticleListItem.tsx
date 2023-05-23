import { CSSProperties, HTMLAttributeAnchorTarget, useMemo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Card } from '@/shared/ui/Card/Card';
import useHover from '@/shared/lib/hooks/useHover';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteArticle } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import TextBlock from '../components/TextBlock';
import {
  Article, ArticleBlockText, ArticleBlockType, ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton/ui/Skeleton';

interface ArticleListItemProps {
  style?: CSSProperties
  className?: string;
  article: Article
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
  setInitialItemIndex?: () => void
}

export const ArticleListItem = (props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
    target,
    style,
    setInitialItemIndex,
  } = props;

  const dispatch = useAppDispatch();

  const [isHovered, bindHover] = useHover();

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
        style={style}
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
            <AppImage
              src={article.img}
              fallBack={
                <Skeleton width='100%' height={200} />
              }
            />
          </div>
          {textBlock
            && (
              <div className={cls.text}>
                <TextBlock block={textBlock} />
              </div>
            )}
          <div className={cls.footer}>
            <AppLink
              target={target}
              to={getRouteArticle(article.id)}
            >
              <Button onClick={setInitialItemIndex}>
                Читать далее...
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      style={style}
      target={target}
      to={getRouteArticle(article.id)}
      {...bindHover}
      className={classNames(className, cls[view])}
    >
      <Card>
        <div className={cls.image}>
          <AppImage
            src={article.img}
            fallBack={
              <Skeleton width={200} height={200} />
            }
          />
          {isHovered && <Text text={article.createdAt} className={cls.date} />}
        </div>
        <div className={cls.info}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
};
