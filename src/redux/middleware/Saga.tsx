import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signOut,
} from 'firebase/auth';

// eslint-disable-next-line
import { ActionType, SignPayload,} from '../actions/Action';
import { app } from '../../firebase';

function* signInSaga(action: ActionType) {
  try {
    const auth = getAuth(app);
    const { email, password } = action.payload as SignPayload;

    if (email && password) {
      const userCredential: UserCredential = yield call(
        signInWithEmailAndPassword,
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      yield put({ type: 'SIGN_IN_SUCCESS', payload: user.uid });
    } else {
      yield put({ type: 'SIGN_IN_FAILED' });
    }
  } catch (error) {
    yield put({ type: 'SIGN_IN_FAILED' });
  }
}

function* signUp(action: ActionType) {
  try {
    const auth = getAuth(app);
    const { email, password } = action.payload as SignPayload;

    if (email && password) {
      const userCredential: UserCredential = yield call(
        createUserWithEmailAndPassword,
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      yield put({ type: 'SIGN_UP_SUCCESS', payload: user.uid });
    } else {
      yield put({ type: 'SIGN_UP_FAILED' });
    }
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      // Handle email already in use error
      yield put({ type: 'SIGN_UP_FAILED', payload: 'Email already in use' });
    } else if (error.code === 'auth/weak-password') {
      // Handle weak password error
      yield put({ type: 'SIGN_UP_FAILED', payload: 'Weak password' });
    } else {
      // Handle other Firebase errors
      yield put({ type: 'SIGN_UP_FAILED', payload: 'Registration failed' });
    }
  }
}

function* passwordForget(action: ActionType) {
  try {
    const auth = getAuth(app);
    const { email } = action.payload as SignPayload;

    if (email) {
      yield call(sendPasswordResetEmail, auth, email);
      yield put({ type: 'PASSWORD_FORGET_SUCCESS' });
    } else {
      yield put({ type: 'PASSWORD_FORGET_FAILURE' });
    }
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    yield put({ type: 'PASSWORD_FORGET_FAILURE', payload: errorMessage });
  }
}
// eslint-disable-next-line
function* passwordResetConfirmation(action: any) {
  try {
    const auth = getAuth(app);
    const { oobCode, newPassword } = action.payload as {
      oobCode: string;
      newPassword: string;
    };

    yield call(confirmPasswordReset, auth, oobCode, newPassword);
    yield put({ type: 'PASSWORD_RESET_CONFIRMATION_SUCCESS' });
  } catch (error: any) {
    if (error.code === 'auth/expired-action-code') {
      yield put({
        type: 'PASSWORD_RESET_CONFIRMATION_FAILURE',
        payload: 'Expired action code',
      });
    } else {
      yield put({
        type: 'PASSWORD_RESET_CONFIRMATION_FAILURE',
        payload: 'Password reset confirmation failed',
      });
    }
  }
}

function* logoutSaga() {
  try {
    const auth = getAuth(app);
    yield call(signOut, auth);
    yield put({ type: 'LOGOUT' });
  } catch (error) {
    // Handle logout failure
  }
}
function* watchAuthActions() {
  yield takeLatest('SIGN_IN_REQUEST', signInSaga);
  yield takeLatest('SIGN_UP_REQUEST', signUp);
  yield takeLatest('PASSWORD_FORGET_REQUEST', passwordForget);
  // eslint-disable-next-line
  yield takeLatest('PASSWORD_RESET_CONFIRMATION_REQUEST', passwordResetConfirmation);
  yield takeLatest('LOGOUT', logoutSaga);
}

export default function* rootSaga() {
  yield all([watchAuthActions()]);
}
