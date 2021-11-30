import { User } from '../types';

export enum AuthenticationActionType {
  SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED',
  SET_AUTHENTICATION_TOKEN = 'SET_AUTHENTICATION_TOKEN',
  SET_USER = 'SET_USER',
}

export interface SetIsAuthenticatedAction {
  type: AuthenticationActionType.SET_IS_AUTHENTICATED;
  isAuthenticated: boolean;
}

export const setIsAuthenticatedAction = (
  isAuthenticated: boolean
): SetIsAuthenticatedAction => ({
  type: AuthenticationActionType.SET_IS_AUTHENTICATED,
  isAuthenticated,
});

export interface SetAuthenticationTokenAction {
  type: AuthenticationActionType.SET_AUTHENTICATION_TOKEN;
  token: string;
}

export const setAuthenticationTokenAction = (
  token: string
): SetAuthenticationTokenAction => ({
  type: AuthenticationActionType.SET_AUTHENTICATION_TOKEN,
  token,
});

export interface SetUserAction {
  type: AuthenticationActionType.SET_USER;
  user: User;
}

export const setUserAction = (user: User): SetUserAction => ({
  type: AuthenticationActionType.SET_USER,
  user,
});

export type AuthenticationAction =
  | SetAuthenticationTokenAction
  | SetIsAuthenticatedAction
  | SetUserAction;
