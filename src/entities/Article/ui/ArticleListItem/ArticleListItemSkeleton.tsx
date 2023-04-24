import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/ui/Skeleton';

import classNames from 'shared/lib/classNames/classNames';
import {
  ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  view: ArticleView
}

export const ArticleListItemSkeleton = (props: ArticleListItemSkeletonProps) => {
  const {
    view,
  } = props;
  if (view === ArticleView.LIST) {
    return (
      <div
        className={cls[view]}
      >
        <Card>
          <div className={cls.header}>
            <div className={cls.user}>
              <Skeleton width={30} height={30} round />
              <Skeleton width={120} height={16} />
            </div>
            <Skeleton width={100} height={16} />
          </div>
          <Skeleton className={cls.titleSkeleton} width='40%' height={30} />
          <Skeleton width='100%' height={240} />
          <div className={cls.footer}>
            <Skeleton className={cls.footerSkeleton} width={120} height={30} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={cls[view]}
    >
      <Card>
        <div className={cls.image}>
          <Skeleton width={200} height={200} />
        </div>
        <div className={cls.info}>
          <Skeleton width={100} height={16} />
          <Skeleton width={60} height={16} />
        </div>
        <Skeleton width={150} height={16} />
      </Card>
    </div>
  );
};
