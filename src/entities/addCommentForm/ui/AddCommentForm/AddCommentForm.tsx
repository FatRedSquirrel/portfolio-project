import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ChangeEvent, useCallback } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AddCommentFormStatus } from '../../model/types/addCommentForm';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';
import {
  getAddCommentFormError,
  getAddCommentFormStatus,
  getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import { ToggleFeatures } from '@/shared/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface AddCommentFormProps {
  className?: string
  sendComment: (text: string) => void
}

const reducers: ReducersList = { addCommentForm: addCommentFormReducer };

const AddCommentForm = (props: AddCommentFormProps) => {
  const {
    className,
    sendComment,
  } = props;

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const text = useSelector(getAddCommentFormText);
  const status = useSelector(getAddCommentFormStatus);
  const error = useSelector(getAddCommentFormError);

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(addCommentFormActions.setText(e.target.value));
  }, [dispatch]);

  const handleSendComment = () => {
    if (text) {
      sendComment(text);
      dispatch(addCommentFormActions.setText(''));
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <Card
            className={classNames(
              cls.form,
              cls.formRedesigned,
              className,
            )}
          >
            <Input
              className={cls.input}
              placeholder={t('Введите текст комментария') as string}
              value={text}
              onChange={handleTextChange}
            />
            <Button
              onClick={handleSendComment}
              disabled={status === AddCommentFormStatus.SENDING}
            >
              {t('Отправить')}
            </Button>
          </Card>
        )}
        off={(
          <div className={classNames(cls.form, className)}>
            <InputDeprecated
              className={cls.input}
              placeholder={t('Введите текст комментария') as string}
              value={text}
              onChange={handleTextChange}
            />
            <ButtonDeprecated
              onClick={handleSendComment}
              disabled={status === AddCommentFormStatus.SENDING}
            >
              {t('Отправить')}
            </ButtonDeprecated>
          </div>
        )}
      />
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;
