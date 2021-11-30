import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  availableLeaguesArraySelector,
  fetchLeaguesAction,
} from '../../store/leagues';

export const Leagues = () => {
  const dispatch = useDispatch();
  const availableLeagues = useSelector(availableLeaguesArraySelector);

  useEffect(() => {
    dispatch(fetchLeaguesAction());
  }, []);

  return (
    <div>
      <h1>Leagues</h1>
      <ul>
        {availableLeagues.map((league) => (
          <Link key={league.leagueId} to={`/league/${league.leagueId}`}>
            {league.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};
