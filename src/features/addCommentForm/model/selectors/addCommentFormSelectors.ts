import { StateSchema } from 'app/providers/StoreProvider';
import { AddCommentFormStatus } from 'features/addCommentForm/model/types/addCommentForm';

export const getAddCommentFormText = (state: StateSchema) => state?.addCommentForm?.text ?? '';
export const getAddCommentFormError = (state: StateSchema) => state?.addCommentForm?.error;
export const getAddCommentFormStatus = (state: StateSchema) => state?.addCommentForm?.status ?? AddCommentFormStatus.IDLE;
