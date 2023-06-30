import { useTranslation } from 'react-i18next';
import { SelectOption } from '@/shared/ui/deprecated/Select/ui/Select';
import { ArticleSortField } from '@/entities/Article/model/types/article';
import { SortOrder } from '@/shared/types/filter';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/ListBox';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import cls from './ArticleSortSelector.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

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
      content: t('Возрастанию'),
    },
    {
      value: 'desc',
      content: t('Убыванию'),
    },
  ];

  const sortFieldOptions: SelectOption<ArticleSortField>[] = [
    {
      value: ArticleSortField.CREATED,
      content: t('Дате'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('Названию'),
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('Просмотрам'),
    },
  ];

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      off={(
        <div className={cls.sort}>
          <ListBoxDeprecated
            items={sortFieldOptions}
            defaultValue='Выберите значение'
            value={sort}
            onChange={changeSort}
          />
          <ListBoxDeprecated
            items={orderOptions}
            defaultValue='Выберите значение'
            value={order}
            onChange={changeOrder}
          />
        </div>
      )}
      on={(
        <div className={cls.sort}>
          <Text text={t('Сортировать по:') as string} />
          <VStack gap='8'>
            <ListBox
              items={sortFieldOptions}
              defaultValue='Выберите значение'
              value={sort}
              onChange={changeSort}
            />
            <ListBox
              items={orderOptions}
              defaultValue='Выберите значение'
              value={order}
              onChange={changeOrder}
            />
          </VStack>
        </div>
      )}
    />
  );
};
