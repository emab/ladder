import { Player } from '../types';
import { PlayersAction } from './players';

export interface PlayersState {
  players: { [id: string]: Player };
}

export interface State {
  players: PlayersState;
}

export type Actions = PlayersAction;
