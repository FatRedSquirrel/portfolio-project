import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/ListBox';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Currency } from '../../model/types/currency';
import { ToggleFeatures } from '@/shared/features';

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

interface CurrencySelectProps {
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const {
    value,
    onChange,
    readonly,
  } = props;

  const { t } = useTranslation();

  const changeHandler = (value: string) => {
    onChange?.(value as Currency);
  };

  const ListBoxProps = {
    items: options,
    value,
    defaultValue: t('Выберите валюту') as string,
    label: t('Валюта') as string,
    readonly,
    onChange: changeHandler,
  };

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <ListBox
          direction='bottom right'
          {...ListBoxProps}
        />
      )}
      off={(
        <ListBoxDeprecated
          direction='bottom'
          {...ListBoxProps}
        />
      )}
    />
  );
});
