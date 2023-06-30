import { useTranslation } from 'react-i18next';
import { ChangeEvent, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { classNamesRedesigned } from '@/shared/lib/classNames/classNames';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
  getProfileForm,
  getProfileIsLoading,
  getProfileError,
  getProfileReadonly,
  getProfileValidationErrors, ValidateProfileError, ProfileCard, fetchProfileData, profileActions,
} from '@/entities/Profile';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { ToggleFeatures } from '@/shared/features';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { className, id } = props;
  const { t } = useTranslation('profile');

  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidationErrors);

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t(
      'Серверная ошибка при сохранении',
    ),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t(
      'Имя и фамилия обязательны',
    ),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
  };

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  }, []);

  const onChangeFirstname = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ firstname: e.target.value || '' }));
    },
    [dispatch],
  );

  const onChangeLastname = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ lastname: e.target.value || '' }));
    },
    [dispatch],
  );

  const onChangeCity = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ city: e.target.value || '' }));
    },
    [dispatch],
  );

  const onChangeAge = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ age: Number(e.target.value || 0) }));
    },
    [dispatch],
  );

  const onChangeUsername = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ username: e.target.value || '' }));
    },
    [dispatch],
  );

  const onChangeAvatar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ avatar: e.target.value || '' }));
    },
    [dispatch],
  );

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }));
    },
    [dispatch],
  );

  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }));
    },
    [dispatch],
  );

  return (
    <VStack gap="8" max className={classNamesRedesigned('', {}, [className])}>
      <EditableProfileCardHeader />
      {validateErrors?.length
        && validateErrors.map((err) => (
          <ToggleFeatures
            key={err}
            feature='isAppRedesigned'
            on={(
              <Text
                variant='error'
                text={validateErrorTranslates[err]}
                data-testid="EditableProfileCard.Error"
              />
            )}
            off={(
              <TextDeprecated
                theme={TextTheme.ERROR}
                text={validateErrorTranslates[err]}
                data-testid="EditableProfileCard.Error"
              />
            )}
          />
        ))}
      <ProfileCard
        data={formData}
        isLoading={isLoading}
        error={error}
        readonly={readonly}
        onChangeFirstname={onChangeFirstname}
        onChangeLastname={onChangeLastname}
        onChangeAge={onChangeAge}
        onChangeCity={onChangeCity}
        onChangeUsername={onChangeUsername}
        onChangeAvatar={onChangeAvatar}
        onChangeCurrency={onChangeCurrency}
        onChangeCountry={onChangeCountry}
      />
    </VStack>
  );
});
