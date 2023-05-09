import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ChangeEvent, useCallback } from 'react';
import { Avatar } from 'shared/ui/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';
import { useParams } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import {
  getProfileError,
} from '../../model/selectors/getProfileError/getProfileError';
import {
  fetchProfileData,
} from '../../model/services/fetchProfileData/fetchProfileData';
import {
  getProfileForm,
} from '../../model/selectors/getProfileForm/getProfileForm';
import {
  getProfileIsLoading,
} from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import {
  getProfileReadonly,
} from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import {
  profileActions,
} from '../../model/slice/profileSlice';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string
    id: string
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    id,
  } = props;

  const { t } = useTranslation('profile');

  const dispatch = useAppDispatch();

  const data = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  }, []);

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
          title={t('Произошла ошибка при закрузке профиля') as string}
          text={t('Попробуйте обновить страницу') as string}
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
          placeholder={t('Имя') as string}
          readonly={readonly}
          onChange={onFirstnameChange}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Фамилия') as string}
          readonly={readonly}
          onChange={onLastnameChange}
        />
        <Input
          value={data?.age}
          placeholder={t('Возраст') as string}
          readonly={readonly}
          onChange={onAgeChange}
        />
        <Input
          value={data?.city}
          placeholder={t('Город') as string}
          readonly={readonly}
          onChange={onCityChange}
        />
        <Input
          value={data?.username}
          placeholder={t('Имя пользователя') as string}
          readonly={readonly}
          onChange={onUsernameChange}
        />
        <Input
          value={data?.avatar}
          placeholder={t('Ссылка на аватар') as string}
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
