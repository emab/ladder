import React from 'react';
import { Leaderboard } from '../../types';

interface LeaderboardProps {
  leaderboard: Leaderboard;
}

export const LeaderboardTable = ({ leaderboard }: LeaderboardProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((entry, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{entry.playerId}</td>
            <td>{entry.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
