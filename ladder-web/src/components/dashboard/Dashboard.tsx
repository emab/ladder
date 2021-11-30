import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LeagueCard } from './LeagueCard';
import { dashboardLeagueSelector } from './selectors';
import { fetchData } from '../../store/appActions';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { availableLeagues, playerLeagues } = useSelector(
    dashboardLeagueSelector
  );

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div>
      <div>
        <div>Joined Leagues</div>
        <div className="grid grid-cols-12 gap-5">
          {playerLeagues.map((league) => (
            <LeagueCard key={league.leagueId} league={league} isPlayerLeague />
          ))}
        </div>
      </div>
      <div>
        <div>Available Leagues</div>
        <div className="grid grid-cols-12 gap-5">
          {availableLeagues.map((league) => (
            <LeagueCard key={league.leagueId} league={league} />
          ))}
        </div>
      </div>
    </div>
  );
};
