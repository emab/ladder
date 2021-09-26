import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Leaderboard } from './Leaderboard';
import { ResultInput } from './ResultInput';
import { SelectLeague } from './SelectLeague';
import { fetchLeaguesAction } from './store/leagues';
import { selectedLeagueSelector } from './store/leagues/selectors';

export function League() {
  const dispatch = useDispatch();
  const selectedLeague = useSelector(selectedLeagueSelector);

  useEffect(() => {
    dispatch(fetchLeaguesAction())
  }, [])

  return (
    <div>
      <div className="flex flex-row mt-3">
        <div className="text-4xl font-bold mb-3">
          {selectedLeague?.name} League
        </div>
        <div className="ml-5">
          Select league: <SelectLeague />
        </div>
        {selectedLeague && <ResultInput leagueId={selectedLeague?.id}/>}
      </div>
      {selectedLeague && (
        <Leaderboard leaderboard={selectedLeague.leaderboard} />
      )}
    </div>
  );
}
