import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playersArraySelector, setPlayersAction } from './store';

export function Scoreboard() {
  const dispatch = useDispatch();
  const players = useSelector(playersArraySelector);

  return (
    <div>
      <div>A scoreboard</div>
      <button
        type="button"
        onClick={() =>
          dispatch(
            setPlayersAction([
              {
                id: '123',
                score: 0,
                username: 'test',
              },
              {
                id: '125',
                score: 0,
                username: 'test',
              },
              {
                id: '126',
                score: 0,
                username: 'test',
              },
              { id: '127', score: 0, username: 'test' },
              {
                id: '128',
                score: 0,
                username: 'test',
              },
              { id: '123', score: 0, username: 'test' },
            ])
          )
        }
      >
        Test
      </button>
      {Object.values(players).map((player) => (
        <div key={player.id}>{player.username}</div>
      ))}
    </div>
  );
}
