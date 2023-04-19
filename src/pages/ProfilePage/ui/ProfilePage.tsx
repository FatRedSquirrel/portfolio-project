import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
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
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useParams } from 'react-router-dom';
import { Page } from 'shared/ui/Page/Page';
import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = () => {
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

  const { id } = useParams<{id: string}>();

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page>
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
      </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
