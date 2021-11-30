import { PlayerState } from '../types';
import { PlayerAction } from './actions';

const initialState: PlayerState = {
  leagues: [],
};

export const playerReducer = (
  state = initialState,
  action: PlayerAction
): PlayerState => {
  switch (action.type) {
    case 'UPDATE_PLAYER_LEAGUES':
      return {
        ...state,
        leagues: action.leagueIds,
      };
    default:
      return state;
  }
};
