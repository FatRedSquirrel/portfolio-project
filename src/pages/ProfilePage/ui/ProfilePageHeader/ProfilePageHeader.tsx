import { Text } from 'shared/ui/Text';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import {
  getProfileIsLoading,
  getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getUserAuthData } from 'entities/User';
import classNames from 'shared/lib/classNames/classNames';
import cls from './ProfilePageHeader.module.scss';

const ProfilePageHeader = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{id: string}>();
  const { t } = useTranslation('profile');

  const readonly = useSelector(getProfileReadonly);
  const authData = useSelector(getUserAuthData);
  const isLoading = useSelector(getProfileIsLoading);

  const canEdit = authData?.id === id;

  const enableEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const cancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const save = useCallback(() => {
    if (id) {
      dispatch(updateProfileData(id));
    }
  }, [dispatch, id]);

  return (
    <div className={
      classNames(
        cls.header,
        isLoading && cls.disabled,
      )
    }
    >
      <Text title={t('Профиль')} />
      {canEdit
        && (readonly
          ? (
            <Button
              className={cls.editBtn}
              theme={ButtonTheme.OUTLINE}
              onClick={enableEdit}
            >
              {t('Редактировать')}
            </Button>
          )
          : (
            <div className={cls.actions}>
              <Button
                className={cls.cancelBtn}
                theme={ButtonTheme.OUTLINE_RED}
                onClick={cancelEdit}
              >
                {t('Отменить')}
              </Button>
              <Button
                className={cls.saveBtn}
                theme={ButtonTheme.OUTLINE}
                onClick={save}
              >
                {t('Сохранить')}
              </Button>
            </div>
          ))}
    </div>
  );
};

export default ProfilePageHeader;
