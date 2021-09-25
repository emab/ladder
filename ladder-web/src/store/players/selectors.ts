import { PlayersState, State } from '../types';

export const playersSelector = (state: State): PlayersState => state.players;