import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from './store/types';

interface IAddPlayerProps {
  getOnSelectAction: (username: string) => Action;
}

export function AddPlayer({ getOnSelectAction }: IAddPlayerProps) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const onClick = () => {
    dispatch(getOnSelectAction(username));
    setUsername('');
  };
  return (
    <div>
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button type="submit" aria-label="Add user" onClick={onClick}>
        <FontAwesomeIcon icon={faCheckSquare} />
      </button>
    </div>
  );
}
