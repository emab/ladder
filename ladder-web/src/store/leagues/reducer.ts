import { LeagueState } from '../types';
import { LeagueAction, LeagueActionType } from './actions';

const initialState: LeagueState = {
  selectedLeague: undefined,
  availableLeagues: {},
};

export const leagueReducer = (
  state = initialState,
  action: LeagueAction
): LeagueState => {
  switch (action.type) {
    case LeagueActionType.SET_AVAILABLE_LEAGUES:
      return {
        ...state,
        availableLeagues: action.leagues.reduce(
          (acc, league) => ({ ...acc, [league.leagueId]: league }),
          {}
        ),
      };
    case LeagueActionType.SET_ACTIVE_LEAGUE:
      return { ...state, selectedLeague: action.leagueId };
    default:
      return state;
  }
};
