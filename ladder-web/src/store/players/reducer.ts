import { PlayersAction, PlayersActionType } from './actions';
import { PlayersState } from '../types';

const initialState: PlayersState = {
  players: {},
};

export const playersReducer = (
  state = initialState,
  action: PlayersAction
): PlayersState => {
  switch (action.type) {
    case PlayersActionType.SET_PLAYERS:
      return {
        ...state,
        players: action.players.reduce(
          (acc, player) => ({ ...acc, [player.id]: player }),
          {}
        ),
      };
    default:
      return state;
  }
};
