import { PlayersState } from '../types';
import { PlayersAction, PlayersActionType } from './actions';

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
          (acc, player) => ({ ...acc, [player.playerId]: player }),
          {}
        ),
      };
    case PlayersActionType.ADD_PLAYER:
      return {
        ...state,
        players: { ...state.players, [action.player.playerId]: action.player },
      };

    case PlayersActionType.DELETE_PLAYER: {
      const nextState = { ...state };
      delete nextState.players[action.playerId];

      return nextState;
    }
    default:
      return state;
  }
};
