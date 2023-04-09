import { Text } from 'shared/ui/Text';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import {
  getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import cls from './ProfilePageHeader.module.scss';

const ProfilePageHeader = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation('profile');

  const readonly = useSelector(getProfileReadonly);

  const enableEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const cancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const save = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={cls.header}>
      <Text title={t('Профиль')} />
      {
        readonly
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
          )
      }
    </div>
  );
};

export default ProfilePageHeader;
