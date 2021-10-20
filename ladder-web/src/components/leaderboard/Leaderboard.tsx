import React from 'react';
import { LeaderboardId } from '../../types';

interface ILeaderboardProps {
  leaderboard: Leaderboard;
}

const sortFn = (a: LeaderboardEntry, b: LeaderboardEntry): number => {
  if (a.rank === null && b.rank !== null) {
    return 1;
  } if (a.rank !== null && b.rank === null) {
    return -1;
  } if (a.rank === null && b.rank === null) {
    return 0;
  }
  return (a.rank as number) - (b.rank as number);
}

export function Leaderboard({ leaderboard }: ILeaderboardProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(leaderboard)
          .sort(sortFn)
          .map(({ player, rank }) => (
            <tr key={player.id}>
              <td>{rank ?? 'Unranked'}</td>
              <td>{player.username}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
