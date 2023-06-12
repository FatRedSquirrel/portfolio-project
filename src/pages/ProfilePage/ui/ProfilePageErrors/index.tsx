import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import {
  getProfileValidationErrors,
  ValidateProfileError,
} from '@/entities/Profile';

const ProfilePageErrors = () => {
  const validationErrors = useSelector(getProfileValidationErrors);

  const { t } = useTranslation('profile');

  const validationErrorsTranslations = {
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Фамилия и имя обязательны'),
    [ValidateProfileError.INCORRECT_AGE]: t('Возраст указан некорректно'),
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
              // @ts-ignore
              text={validationErrorsTranslations[err as any]}
            />
          ))}
    </div>
  );
};

export default ProfilePageErrors;
