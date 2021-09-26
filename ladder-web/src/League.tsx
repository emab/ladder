import React from 'react';
import { useSelector } from 'react-redux';
import { Leaderboard } from './Leaderboard';
import { SelectLeague } from './SelectLeague';
import { selectedLeagueSelector } from './store/leagues/selectors';

export function League() {
  const selectedLeague = useSelector(selectedLeagueSelector);

  return (
    <div>
      <div className="flex flex-row">
        <div className="text-4xl font-bold mb-3">
          {selectedLeague?.name} League
        </div>
        <div className="ml-5">
          Select league: <SelectLeague />
        </div>
      </div>
      {selectedLeague && (
        <Leaderboard leaderboard={selectedLeague.leaderboard} />
      )}
    </div>
  );
}
