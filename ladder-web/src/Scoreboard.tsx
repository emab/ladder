import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayersAction, playersArraySelector } from './store';

export function Scoreboard() {
  const dispatch = useDispatch();
  const players = useSelector(playersArraySelector);

  return (
    <div>
      <div>A scoreboard</div>
      <button type="button" onClick={() => dispatch(fetchPlayersAction())}>
        Test
      </button>
      {Object.values(players).map((player) => (
        <div key={player.id}>{player.username}</div>
      ))}
    </div>
  );
}
