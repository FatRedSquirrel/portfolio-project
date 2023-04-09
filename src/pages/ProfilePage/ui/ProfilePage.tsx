import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  fetchProfileData,
  ProfileCard,
  profileReducer,
  getProfileIsLoading,
  getProfileError,
  getProfileForm,
  getProfileValidationErrors,
  ValidateProfileError,
} from 'entities/Profile';
import { Text, TextTheme } from 'shared/ui/Text';
import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();

  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  const validationErrors = useSelector(getProfileValidationErrors);

  const validationErrorsTranslations = {
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Фамилия и имя обязательны'),
    [ValidateProfileError.INCORRECT_USERNAME]: t('Имя пользователя не указано'),
    [ValidateProfileError.INCORRECT_AGE]: t('Возраст указан некорректно'),
    [ValidateProfileError.INCORRECT_CITY]: t('Город не указан'),
    [ValidateProfileError.NO_DATA]: t('Нет данных'),
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка'),
  };

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchProfileData());
    }
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={className}>
        <ProfilePageHeader />
        {validationErrors?.length
          && validationErrors.map((err) => (
            <Text
              key={err}
              theme={TextTheme.ERROR}
              text={validationErrorsTranslations[err]}
            />
          ))}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
