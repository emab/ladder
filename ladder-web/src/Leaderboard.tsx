import React from 'react';
import { LeaderboardEntry } from './types';

interface ILeaderboardProps {
  leaderboard: Array<LeaderboardEntry>;
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
        {leaderboard.map(({ player, rank }) => (
          <tr key={player.id}>
            <td>{rank}</td>
            <td>{player.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
