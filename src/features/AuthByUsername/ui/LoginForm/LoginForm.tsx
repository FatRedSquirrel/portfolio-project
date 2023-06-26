import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ChangeEvent, memo, useCallback } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  const forceUpdate = useForceUpdate();

  const onFieldChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username' || name === 'password') {
      dispatch(loginActions.setLoginData({ name, value }));
    }
  }, [dispatch]);

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
      forceUpdate();
    }
  }, [dispatch, username, password, onSuccess, forceUpdate]);

  const content = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <VStack gap='8'>
          <Text title={t('Форма авторизации') as string} />
          {error && <Text text={t('Вы ввели неверный логин или пароль') as string} variant='error' />}
          <Input
            autofocus
            type='text'
            name='username'
            className={cls.input}
            placeholder={t('Введите username') as string}
            onChange={onFieldChange}
            value={username}
          />
          <Input
            type="password"
            name='password'
            className={cls.input}
            placeholder={t('Введите пароль') as string}
            onChange={onFieldChange}
            value={password}
          />
          <Button
            className={cls.loginBtn}
            onClick={onLoginClick}
            disabled={isLoading}
          >
            {t('Войти')}
          </Button>
        </VStack>
      )}
      off={(
        <div className={classNames(cls.LoginForm, className)}>
          <TextDeprecated title={t('Форма авторизации') as string} />
          {error && <TextDeprecated text={t('Вы ввели неверный логин или пароль') as string} theme={TextTheme.ERROR} />}
          <InputDeprecated
            autofocus
            type='text'
            name='username'
            className={cls.input}
            placeholder={t('Введите username') as string}
            onChange={onFieldChange}
            value={username}
          />
          <InputDeprecated
            type="text"
            name='password'
            className={cls.input}
            placeholder={t('Введите пароль') as string}
            onChange={onFieldChange}
            value={password}
          />
          <ButtonDeprecated
            theme={ButtonTheme.OUTLINE}
            className={cls.loginBtn}
            onClick={onLoginClick}
            disabled={isLoading}
          >
            {t('Войти')}
          </ButtonDeprecated>
        </div>
      )}
    />
  );

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={initialReducers}
    >
      {content}

    </DynamicModuleLoader>
  );
});

export default LoginForm;
