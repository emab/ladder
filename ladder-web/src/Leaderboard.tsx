import React from 'react';
import { LeaderboardEntry } from './types';

interface ILeaderboardProps {
  leaderboard: Map<String, LeaderboardEntry>;
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
          .sort((a, b) => {
            if (a.rank === null || b.rank === null) {
              return 1;
            }
            return a.rank - b.rank
          })
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
