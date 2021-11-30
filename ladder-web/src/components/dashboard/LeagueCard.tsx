import React, { useState } from 'react';
import { League } from '../../types';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import {
  addPlayerLeagueAction,
  removePlayerLeagueAction,
} from '../../store/player';
import { Link } from 'react-router-dom';

interface LeagueCardProps {
  league: League;
  isPlayerLeague?: boolean;
}

export const LeagueCard = ({
  league,
  isPlayerLeague = false,
}: LeagueCardProps) => {
  const [showWarn, setShowWarn] = useState(false);
  const dispatch = useDispatch();

  const handleAddPlayerLeague = () => {
    dispatch(addPlayerLeagueAction(league.leagueId));
  };

  const handleRemovePlayerLeague = () => {
    if (showWarn) {
      dispatch(removePlayerLeagueAction(league.leagueId));
    } else {
      setShowWarn(true);
    }
  };

  return (
    <div className="p-1 rounded bg-blue-600 text-white">
      <div className="flex items-center justify-between">
        <Link to={`/league/${league.leagueId}`}>{league.name}</Link>
        {isPlayerLeague && (
          <button
            className={cn(
              'rounded text-white',
              showWarn
                ? 'bg-red-600 hover:bg-red-500 px-1'
                : 'bg-blue-700 hover:bg-blue-500 w-6 h-6'
            )}
            onClick={handleRemovePlayerLeague}
          >
            {showWarn ? 'Sure?' : '-'}
          </button>
        )}
        {showWarn && (
          <button
            className="h-6 w-6 bg-blue-700 hover:bg-blue-500 rounded text-white"
            onClick={() => setShowWarn(false)}
          >
            X
          </button>
        )}
        {!isPlayerLeague && (
          <button
            className="h-6 w-6 bg-blue-700 hover:bg-blue-500 rounded text-white"
            onClick={handleAddPlayerLeague}
          >
            +
          </button>
        )}
      </div>
      <div>
        <span className="text-sm">Players: {league.players.length}</span>
      </div>
    </div>
  );
};
