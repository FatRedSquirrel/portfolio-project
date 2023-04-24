import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select';
import { memo } from 'react';
import { Currency } from '../../model/types/currency';

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

  return (
    <Select
      label={t('Валюта')}
      options={options}
      value={value}
      onChange={changeHandler}
      readonly={readonly}
    />
  );
});
