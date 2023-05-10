import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ListBox } from 'shared/ui/ListBox';
import { Country } from '../../model/types/country';

const options = [
  { value: Country.USA, content: Country.USA },
  { value: Country.Japan, content: Country.Japan },
  { value: Country.Germany, content: Country.Germany },
  { value: Country.Turkey, content: Country.Turkey },
  { value: Country.Switzerland, content: Country.Switzerland },
];

interface CountrySelectProps {
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}

export const CountrySelect = memo((props: CountrySelectProps) => {
  const {
    value,
    onChange,
    readonly,
  } = props;

  const { t } = useTranslation();

  const changeHandler = (value: string) => {
    onChange?.(value as Country);
  };

  return (
    <ListBox
      label={t('Страна') as string}
      items={options}
      value={value}
      defaultValue={t('Выберите страну') as string}
      readonly={readonly}
      direction='top'
      onChange={changeHandler}
    />
  );
});
