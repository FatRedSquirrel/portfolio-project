import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader';
import { useSelector } from 'react-redux';
import { getProfileReadonly, profileActions } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ChangeEvent, useCallback } from 'react';
import { Avatar } from 'shared/ui/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Select } from 'shared/ui/Select';
import { Country, CountrySelect } from 'entities/Country';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
  } = props;

  const dispatch = useAppDispatch();

  const { t } = useTranslation('profile');

  const readonly = useSelector(getProfileReadonly);

  const onFirstnameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(profileActions.updateProfile({ firstname: e.target.value }));
  }, [dispatch]);

  const onLastnameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(profileActions.updateProfile({ lastname: e.target.value }));
  }, [dispatch]);

  const onAgeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Checking if input value is number
    if (!/^[0-9]+$/.test(value) && value !== '') {
      return;
    }

    dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
  }, [dispatch]);

  const onCityChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(profileActions.updateProfile({ city: e.target.value }));
  }, [dispatch]);

  const onUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(profileActions.updateProfile({ username: e.target.value }));
  }, [dispatch]);

  const onAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(profileActions.updateProfile({ avatar: e.target.value }));
  }, [dispatch]);

  const onCurrencyChange = useCallback((currency: Currency) => {
    dispatch(profileActions.updateProfile({ currency }));
  }, [dispatch]);

  const onCountryChange = useCallback((country: Country) => {
    dispatch(profileActions.updateProfile({ country }));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, className, cls.loading)}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, className, cls.error)}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при закрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  return (
    <div
      className={
        classNames(
          cls.ProfileCard,
          className,
          cls.data,
          !readonly && cls.editing,
        )
      }
    >
      <div className={cls.avatarWrapper}>
        <div className={cls.border}>
          <Avatar
            src={data?.avatar}
            size={200}
            alt='Аватар пользователя'
          />
        </div>
      </div>
      <form className={cls.form}>
        <Input
          value={data?.firstname}
          placeholder={t('Имя')}
          readonly={readonly}
          onChange={onFirstnameChange}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Фамилия')}
          readonly={readonly}
          onChange={onLastnameChange}
        />
        <Input
          value={data?.age}
          placeholder={t('Возраст')}
          readonly={readonly}
          onChange={onAgeChange}
        />
        <Input
          value={data?.city}
          placeholder={t('Город')}
          readonly={readonly}
          onChange={onCityChange}
        />
        <Input
          value={data?.username}
          placeholder={t('Имя пользователя')}
          readonly={readonly}
          onChange={onUsernameChange}
        />
        <Input
          value={data?.avatar}
          placeholder={t('Ссылка на аватар')}
          readonly={readonly}
          onChange={onAvatarChange}
        />
        <CurrencySelect
          value={data?.currency}
          onChange={onCurrencyChange}
          readonly={readonly}
        />
        <CountrySelect
          value={data?.country}
          onChange={onCountryChange}
          readonly={readonly}
        />
      </form>
    </div>
  );
};
