import { ReactNode } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/deprecated/Card/Card';
import { ArticleType } from '@/entities/Article/model/types/article';
import cls from './Tabs.module.scss';

export interface TabItem<T> {
  value: T
  content: ReactNode
}

interface TabsProps<T> {
  className?: string
  tabs: TabItem<T>[]
  value: ArticleType
  onTabClick: (tab: TabItem<T>) => void
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const {
    className,
    tabs,
    value,
    onTabClick,
  } = props;

  const clickHandler = (tab: TabItem<T>) => () => {
    onTabClick(tab);
  };

  return (
    <div className={classNames(cls.tabs, className)}>
      {tabs.map((tab, index) => (
        <Card
          onClick={clickHandler(tab)}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={classNames(cls.tab)}
          key={index}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
};
