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
          (acc, player) => ({ ...acc, [player.id]: player }),
          {}
        ),
      };
    case PlayersActionType.ADD_PLAYER:
      return {
        ...state,
        players: { ...state.players, [action.player.id]: action.player },
      };
    case PlayersActionType.ADD_PLAYER_LEAGUE:
      return {
        ...state,
        players: {
          ...state.players,
          [action.playerId]: {
            ...state.players[action.playerId],
            leagues: [
              ...state.players[action.playerId].leagues,
              action.leagueId,
            ],
          },
        },
      };
    case PlayersActionType.REMOVE_PLAYER_LEAGUE:
      return {
        ...state,
        players: {
          ...state.players,
          [action.playerId]: {
            ...state.players[action.playerId],
            leagues: state.players[action.playerId].leagues.filter(
              (league) => league !== action.leagueId
            ),
          },
        },
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
