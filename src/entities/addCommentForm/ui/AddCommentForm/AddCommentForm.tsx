import { useTranslation } from 'react-i18next';
import classNames from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button';
import { useSelector } from 'react-redux';
import { ChangeEvent, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AddCommentFormStatus } from '../../model/types/addCommentForm';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';
import {
  getAddCommentFormError,
  getAddCommentFormStatus,
  getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';

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
      <div className={classNames(cls.form, className)}>
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
      </div>
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;
