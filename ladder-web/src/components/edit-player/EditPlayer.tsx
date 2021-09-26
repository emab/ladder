import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { match as IMatch } from 'react-router-dom';
import {
  addPlayerLeagueAction,
  playerByIdSelector,
  removePlayerLeagueAction,
} from '../../store';
import { availableLeaguesArraySelector } from '../../store/leagues/selectors';

interface IEditPlayerMatch extends IMatch {
  params: {
    playerId: string;
  };
}

interface IEditPlayerProps {
  match: IEditPlayerMatch;
}

export function EditPlayer({ match }: IEditPlayerProps) {
  const dispatch = useDispatch();
  const player = useSelector(playerByIdSelector(match.params.playerId));
  const availableLeagues = useSelector(availableLeaguesArraySelector);

  const onCheckboxChangeCreator =
    (leagueId: string) => (event: ChangeEvent<HTMLInputElement>) => {
      event.target.checked
        ? dispatch(addPlayerLeagueAction(player.id, leagueId))
        : dispatch(removePlayerLeagueAction(player.id, leagueId));
    };

  return (
    <div>
      <div className="flex flex-row">
        <div className="text-xl font-bold">
          Editing user: {player?.username}
        </div>
      </div>
      <div>
        <div className="text-xl font-bold">League Selection</div>

        {availableLeagues.map((league) => (
          <div key={league.id} className="flex flex-row">
            <div className="w-36">{league.name}</div>
            <input
              type="checkbox"
              checked={player.leagues.includes(league.id)}
              onChange={onCheckboxChangeCreator(league.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
