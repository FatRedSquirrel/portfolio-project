import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Text as TextDeprecated, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/ui/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { TextSize } from '@/shared/ui/deprecated/Text/ui/Text';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import {
  getArticlesDetailsData, getArticlesDetailsError,
  getArticlesDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import cls from './ArticleDetails.module.scss';
import CodeBlock from '../components/CodeBlock';
import TextBlock from '../components/TextBlock';
import ImageBlock from '../components/ImageBlock';
import { ToggleFeatures, toggleFeatures } from '@/shared/features';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

const reducers = {
  articleDetails: articleDetailsReducer,
};

const renderBlock = (block: ArticleBlock) => {
  switch (block.type) {
  case ArticleBlockType.CODE:
    return <CodeBlock key={block.id} block={block} />;
  case ArticleBlockType.TEXT:
    return <TextBlock key={block.id} block={block} />;
  case ArticleBlockType.IMAGE:
    return <ImageBlock key={block.id} className={cls.imageBlock} block={block} />;
  default:
    return null;
  }
};

const Skeleton = toggleFeatures({
  name: 'isAppRedesigned',
  on: () => SkeletonRedesigned,
  off: () => SkeletonDeprecated,
});

const Deprecated = () => {
  const article = useSelector(getArticlesDetailsData);

  return (
    <>
      <Avatar
        size={200}
        src={article?.img}
        className={cls.avatar}
      />
      <TextDeprecated
        className={cls.title}
        title={article?.title}
        text={article?.subtitle}
        size={TextSize.L}
      />
      <div className={cls.articleInfo}>
        <EyeIcon />
        <Text text={article?.views.toString()} />
      </div>
      <div className={cls.articleInfo}>
        <CalendarIcon />
        <TextDeprecated text={article?.createdAt} />
      </div>
      <div className={cls.content}>
        {article?.blocks.map(renderBlock)}
      </div>
    </>
  );
};

const Redesigned = () => {
  const article = useSelector(getArticlesDetailsData);

  return (
    <>
      <Text title={article?.title} size='xl' bold />
      <Text title={article?.subtitle} />
      <AppImage
        fallback={<Skeleton width="100%" height={420} border="16px" />}
        src={article?.img}
        className={cls.img}
      />
      {article?.blocks.map(renderBlock)}
    </>
  );
};

export const ArticleDetails = memo(() => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{id: string}>();

  const isLoading = useSelector(getArticlesDetailsIsLoading);
  const error = useSelector(getArticlesDetailsError);

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
    }
  }, [id]);

  let content;

  if (error) {
    content = (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <Text
            title='Произошла ошибка при загрузке статьи'
            text='Попробуйте перезагрузить страницу'
            bold
            size='l'
          />
        )}
        off={(
          <TextDeprecated
            title='Произошла ошибка при загрузке статьи'
            text='Попробуйте перезагрузить страницу'
            align={TextAlign.CENTER}
            theme={TextTheme.ERROR}
          />
        )}
      />
    );
  } else {
    content = (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<Redesigned />}
        off={<Deprecated />}
      />
    );
  }

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} border='100%' />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    );
  }

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount
    >
      {content}
    </DynamicModuleLoader>
  );
});
