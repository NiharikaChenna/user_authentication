export interface ActionType {
  type:
    | 'SIGN_IN_REQUEST'
    | 'SIGN_IN_SUCCESS'
    | 'SIGN_IN_FAILED'
    | 'SIGN_UP_REQUEST'
    | 'SIGN_UP_SUCCESS'
    | 'SIGN_UP_FAILED'
    | 'PASSWORD_FORGET_REQUEST'
    | 'PASSWORD_FORGET_SUCCESS'
    | 'PASSWORD_FORGET_FAILURE'
    | 'PASSWORD_RESET_CONFIRMATION_REQUEST'
    | 'PASSWORD_RESET_CONFIRMATION_SUCCESS'
    | 'PASSWORD_RESET_CONFIRMATION_FAILURE'
    | 'LOGOUT';
  payload?: string | SignPayload;
}

export interface SignPayload {
  email: string;
  password: string;
}

export const signInRequest = (payload: SignPayload): ActionType => ({
  type: 'SIGN_IN_REQUEST',
  payload,
});

export const signInSuccess = (userId: string): ActionType => ({
  type: 'SIGN_IN_SUCCESS',
  payload: userId,
});

export const signInFailed = (): ActionType => ({
  type: 'SIGN_IN_FAILED',
});

export const signUpRequest = (payload: SignPayload): ActionType => ({
  type: 'SIGN_UP_REQUEST',
  payload,
});

export const signUpSuccess = (userId: string): ActionType => ({
  type: 'SIGN_UP_SUCCESS',
  payload: userId,
});

export const signUpFailed = (errorMessage: string): ActionType => ({
  type: 'SIGN_UP_FAILED',
  payload: errorMessage,
});

export const logout = (): ActionType => ({
  type: 'LOGOUT',
});

export const passwordForgetRequest = (email: string): ActionType => ({
  type: 'PASSWORD_FORGET_REQUEST',
  payload: email,
});

export const passwordForgetSuccess = (): ActionType => ({
  type: 'PASSWORD_FORGET_SUCCESS',
});

export const passwordForgetFailure = (error: string): ActionType => ({
  type: 'PASSWORD_FORGET_FAILURE',
  payload: error,
});
// eslint-disable-next-line
export const passwordResetConfirmationRequest = (password: string): ActionType => ({
  type: 'PASSWORD_RESET_CONFIRMATION_REQUEST',
  payload: password,
});

export const passwordResetConfirmation = (): ActionType => ({
  type: 'PASSWORD_RESET_CONFIRMATION_SUCCESS',
});

export const passwordResetFailure = (error: string): ActionType => ({
  type: 'PASSWORD_RESET_CONFIRMATION_FAILURE',
  payload: error,
});
