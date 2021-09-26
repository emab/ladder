import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveLeagueAction } from '../../store/leagues';
import {
  availableLeaguesArraySelector,
  selectedLeagueSelector,
} from '../../store/leagues/selectors';

export const SelectLeague = () => {
  const dispatch = useDispatch();
  const selectedLeague = useSelector(selectedLeagueSelector);
  const availableLeagues = useSelector(availableLeaguesArraySelector);

  return (
    <div>
      <select
        name="leagues"
        onChange={(event) =>
          dispatch(setActiveLeagueAction(event.target.value))
        }
        value={selectedLeague?.id}
      >
        {availableLeagues.map((league) => (
          <option
            value={league.id}
            key={league.id}
          >
            {league.name}
          </option>
        ))}
      </select>
    </div>
  );
};