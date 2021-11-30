import { AuthState } from '../types';
import { AuthenticationAction, AuthenticationActionType } from './actions';

// TODO is there a better way to do this?
const initialState: AuthState = {
  isAuthenticated: false,
  user: { id: '', name: '' },
  token: '',
};

export const authenticationReducer = (
  state = initialState,
  action: AuthenticationAction
): AuthState => {
  switch (action.type) {
    case AuthenticationActionType.SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    case AuthenticationActionType.SET_AUTHENTICATION_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case AuthenticationActionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
