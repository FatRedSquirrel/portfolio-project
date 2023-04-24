import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select';
import { memo } from 'react';
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
    <Select
      label={t('Страна')}
      options={options}
      value={value}
      onChange={changeHandler}
      readonly={readonly}
    />
  );
});
