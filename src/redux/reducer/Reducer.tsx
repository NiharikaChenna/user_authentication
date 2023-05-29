// prettier-ignore
import {SignPayload} from '../actions/Action';

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: string | null;
  errorMessage: string;
  isLoading: boolean;
}

type Action =
  | { type: 'SIGN_IN_REQUEST'; payload: SignPayload }
  | { type: 'SIGN_IN_SUCCESS'; payload: string }
  | { type: 'SIGN_IN_FAILED' }
  | { type: 'SIGN_UP_SUCCESS'; payload: string }
  | { type: 'SIGN_UP_FAILED'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'PASSWORD_FORGET_REQUEST'; payload: string }
  | { type: 'PASSWORD_FORGET_SUCCESS' }
  | { type: 'PASSWORD_FORGET_FAILURE'; payload: string }
  | { type: 'PASSWORD_RESET_CONFIRMATION_REQUEST'; payload: string }
  | { type: 'PASSWORD_RESET_CONFIRMATION_SUCCESS' }
  // eslint-disable-next-line
| { type: 'PASSWORD_RESET_CONFIRMATION_FAILURE'; payload: string };


const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  errorMessage: '',
  isLoading: false,
};

const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case 'SIGN_IN_REQUEST':
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        currentUser: action.payload,
        errorMessage: '',
      };
    case 'SIGN_IN_FAILED':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        currentUser: null,
        errorMessage: 'Invalid username or password',
      };
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        currentUser: action.payload,
        errorMessage: '',
      };
    case 'SIGN_UP_FAILED':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        currentUser: null,
        errorMessage: 'Sign up failed',
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        errorMessage: '',
      };
    case 'PASSWORD_FORGET_REQUEST':
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case 'PASSWORD_FORGET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
      };
    case 'PASSWORD_FORGET_FAILURE':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case 'PASSWORD_RESET_CONFIRMATION_REQUEST':
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case 'PASSWORD_RESET_CONFIRMATION_SUCCESS':
      return {
        ...state,
        errorMessage: '',
      };
    case 'PASSWORD_RESET_CONFIRMATION_FAILURE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
