import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
  Text as TextDeprecated,
  TextAlign,
  TextTheme,
} from '@/shared/ui/deprecated/Text';

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation();

  return (
    <HStack
      justify="center"
      max
      className={classNames(cls.ProfileCard, cls.error)}
    >
      <TextDeprecated
        theme={TextTheme.ERROR}
        title={t('Произошла ошибка при загрузке профиля') as string}
        text={t('Попробуйте обновить страницу') as string}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedLoader = () => (
  <HStack
    justify="center"
    max
    className={classNames(cls.ProfileCard, cls.loading)}
  >
    <Loader />
  </HStack>
);

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
  } = props;
  const { t } = useTranslation('profile');

  return (
    <VStack
      gap="8"
      max
      className={classNames(cls.ProfileCard, !readonly && cls.editing, className)}
    >
      {data?.avatar && (
        <HStack justify="center" max className={cls.avatarWrapper}>
          <AvatarDeprecated src={data?.avatar} />
        </HStack>
      )}
      <InputDeprecated
        value={data?.firstname}
        placeholder={t('Ваше имя') as string}
        className={cls.input}
        onChange={onChangeFirstname}
        readonly={readonly}
        data-testid="ProfileCard.firstname"
      />
      <InputDeprecated
        value={data?.lastname}
        placeholder={t('Ваша фамилия') as string}
        className={cls.input}
        onChange={onChangeLastname}
        readonly={readonly}
        data-testid="ProfileCard.lastname"
      />
      <InputDeprecated
        value={data?.age}
        placeholder={t('Ваш возраст') as string}
        className={cls.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.city}
        placeholder={t('Город') as string}
        className={cls.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.username}
        placeholder={t('Введите имя пользователя') as string}
        className={cls.input}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.avatar}
        placeholder={t('Введите ссылку на аватар') as string}
        className={cls.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <CurrencySelect
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  );
});
