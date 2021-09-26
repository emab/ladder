import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { playersArraySelector } from './store';

export function PlayerList() {
  const history = useHistory();
  const players = useSelector(playersArraySelector);

  return (
    <div>
      {players.map((player) => (
        <div key={player.id} className="flex flex-row">
          <div className="w-40">{player.username}</div>
          <button
            type="button"
            aria-label="Edit user"
            onClick={() => history.push(`/players/${player.id}`)}
          >
            <FontAwesomeIcon icon={faUserEdit} />
          </button>
        </div>
      ))}
    </div>
  );
}
