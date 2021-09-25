import { PlayersAction } from './actions';
import { PlayersState } from '../types';

const initialState: PlayersState = {
  players: {},
};

export const playersReducer = (state = initialState, action: PlayersAction): PlayersState => {
  switch (action.type) {
    default:
      return state;
  }
};