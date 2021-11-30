import { State } from '../types';
import { createSelector } from 'reselect';

export const authenticationSelector = (state: State) => state.authentication;

export const authenticationTokenSelector = createSelector(
  authenticationSelector,
  (state) => state.token
);

export const authenticationUserIdSelector = createSelector(
  authenticationSelector,
  (state) => state.user.id
);
