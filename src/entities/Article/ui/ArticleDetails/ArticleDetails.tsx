import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text';
import { Skeleton } from 'shared/ui/Skeleton/ui/Skeleton';
import { Avatar } from 'shared/ui/Avatar';
import EyeIcon from 'shared/assets/icons/eye.svg';
import CalendarIcon from 'shared/assets/icons/calendar.svg';
import { TextSize } from 'shared/ui/Text/ui/Text';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useParams } from 'react-router-dom';
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

const reducers = {
  articleDetails: articleDetailsReducer,
};

interface ArticleDetailsProps {}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{id: string}>();

  const isLoading = useSelector(getArticlesDetailsIsLoading);
  const error = useSelector(getArticlesDetailsError);
  const article = useSelector(getArticlesDetailsData);

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
    }
  }, [id]);

  const renderBlock = useCallback((block: ArticleBlock) => {
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
  }, []);

  let content = (
    <>
      <Avatar
        size={200}
        src={article?.img}
        className={cls.avatar}
      />
      <Text
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
        <Text text={article?.createdAt} />
      </div>
      <div className={cls.content}>
        {article?.blocks.map(renderBlock)}
      </div>
    </>
  );

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} round />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    );
  }

  if (error) {
    content = (
      <Text
        title='Произошла ошибка при загрузке статьи'
        text='Попробуйте перезагрузить страницу'
        align={TextAlign.CENTER}
        theme={TextTheme.ERROR}
      />
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
