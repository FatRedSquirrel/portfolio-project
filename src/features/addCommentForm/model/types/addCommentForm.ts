export enum AddCommentFormStatus {
  IDLE = 'idle',
  SENDING = 'sending'
}

export interface AddCommentFormSchema {
  text?: string
  error?: string
  status: AddCommentFormStatus
}
