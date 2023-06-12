import { ReactNode } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/deprecated/Card';
import { ArticleType } from '@/entities/Article/model/types/article';
import cls from './Tabs.module.scss';

export interface TabItem<T> {
  value: string
  content: ReactNode
}

interface TabsProps<T> {
  className?: string
  tabs: TabItem<T>[]
  value: ArticleType
  onTabClick: (tab: ArticleType) => void
}

/**
 * @deprecated
 */
export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const {
    className,
    tabs,
    value,
    onTabClick,
  } = props;

  const clickHandler = (tab: ArticleType) => () => {
    onTabClick(tab);
  };

  return (
    <div className={classNames(cls.tabs, className)}>
      {tabs.map((tab, index) => {
        const isSelceted = tab.value === value;
        return (
          <Card
            onClick={clickHandler(tab.value as ArticleType)}
            theme={isSelceted ? CardTheme.NORMAL : CardTheme.OUTLINED}
            className={classNames(
              cls.tab,
              isSelceted && cls.selected,
            )}
            key={index}
          >
            {tab.content}
          </Card>
        );
      })}
    </div>
  );
};
