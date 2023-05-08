import { useSelector } from 'react-redux';
import { Text, TextTheme } from 'shared/ui/Text';
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
import { useTranslation } from 'react-i18next';

const ProfilePageErrors = () => {
  const validationErrors = useSelector(getProfileValidationErrors);

  const { t } = useTranslation('profile');

  const validationErrorsTranslations = {
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Фамилия и имя обязательны'),
    [ValidateProfileError.INCORRECT_USERNAME]: t('Имя пользователя не указано'),
    [ValidateProfileError.INCORRECT_AGE]: t('Возраст указан некорректно'),
    [ValidateProfileError.INCORRECT_CITY]: t('Город не указан'),
    [ValidateProfileError.NO_DATA]: t('Нет данных'),
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка'),
  };

  return (
    <div>
      {validationErrors?.length
          && validationErrors.map((err) => (
            <Text
              key={err}
              theme={TextTheme.ERROR}
              text={validationErrorsTranslations[err]}
            />
          ))}
    </div>
  );
};

export default ProfilePageErrors;
