import React from 'react';
import { useSelector } from 'react-redux';
import { match as IMatch } from 'react-router-dom';
import { leagueByIdSelector } from '../../store/leagues';
import { LeaderboardTable } from '../leaderboard-table/LeaderboardTable';

interface IEditPlayerMatch extends IMatch {
  params: {
    leagueId: string;
  };
}

interface LeagueProps {
  match: IEditPlayerMatch;
}

export const League = ({ match }: LeagueProps) => {
  const selectedLeague = useSelector(leagueByIdSelector(match.params.leagueId));

  return (
    <div>
      <div className="flex flex-row mt-3">
        <div className="text-4xl font-bold mb-3">
          {selectedLeague?.name} League
        </div>
      </div>
      {selectedLeague && (
        <LeaderboardTable leaderboard={selectedLeague.leaderboard} />
      )}
    </div>
  );
};
