import { useSelector } from 'react-redux';
import { getArticlesPageType } from '@/pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { TabItem, Tabs } from '@/shared/ui/Tabs/ui/Tabs';
import { ArticleType } from '@/entities/Article';
import cls from './ArticleTypeTabs.module.scss';

interface ArticleTypeTabsProps {
  onTabClick: (tab: TabItem<ArticleType>) => void
}

export const ArticleTypeTabs = ({ onTabClick }: ArticleTypeTabsProps) => {
  const typeTabs: TabItem<ArticleType>[] = [
    {
      value: ArticleType.ALL,
      content: 'Все',
    },
    {
      value: ArticleType.IT,
      content: 'IT',
    },
    {
      value: ArticleType.ECONOMICS,
      content: 'Экномика',
    },
    {
      value: ArticleType.SCIENCE,
      content: 'Наука',
    },
  ];

  const type = useSelector(getArticlesPageType);

  return (
    <Tabs
      className={cls.tabs}
      tabs={typeTabs}
      value={type}
      onTabClick={onTabClick}
    />
  );
};
