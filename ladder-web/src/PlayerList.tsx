import { faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AddPlayer } from './AddPlayer';
import { deletePlayerAction, playersArraySelector } from './store';

export function PlayerList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const players = useSelector(playersArraySelector);

  return (
    <div>
      <div className="m-1">
        <AddPlayer />
      </div>
      <div className="m-1">
        {players.map((player) => (
          <div key={player.id} className="flex flex-row">
            <div className="w-40">{player.username}</div>
            <button
              type="button"
              aria-label="Edit user"
              onClick={() => history.push(`/players/${player.id}`)}
              title="Edit user"
            >
              <FontAwesomeIcon icon={faUserEdit} />
            </button>
            <button
              type="button"
              aria-label="Delete user"
              onClick={() => dispatch(deletePlayerAction(player.id))}
              title="Delete user"
              className="mx-2"
            >
              <FontAwesomeIcon icon={faUserTimes} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
