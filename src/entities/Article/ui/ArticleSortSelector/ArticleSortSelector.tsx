import classNames from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select';
import { useTranslation } from 'react-i18next';
import { SelectOption } from 'shared/ui/Select/ui/Select';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';
import { ListBox } from 'shared/ui/ListBox/ui/ListBox';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  changeSort: (newSort: ArticleSortField) => void
  changeOrder: (newOrder: SortOrder) => void
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
  const {
    className,
    sort,
    order,
    changeSort,
    changeOrder,
  } = props;

  const { t } = useTranslation();

  const orderOptions: SelectOption<SortOrder>[] = [
    {
      value: 'asc',
      content: t('возрастанию'),
    },
    {
      value: 'desc',
      content: t('убыванию'),
    },
  ];

  const sortFieldOptions: SelectOption<ArticleSortField>[] = [
    {
      value: ArticleSortField.CREATED,
      content: t('дате'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('названию'),
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('просмотрам'),
    },
  ];

  return (
    <div className={cls.sort}>
      <ListBox
        items={sortFieldOptions}
        defaultValue='Выберите значение'
        value={sort}
        onChange={changeSort as (value: string) => void}
      />
      <ListBox
        items={orderOptions}
        defaultValue='Выберите значение'
        value={order}
        onChange={changeOrder as (value: string) => void}
      />
    </div>
  );
};
