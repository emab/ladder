import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlayerRequestAction } from '../../store';

export function AddPlayer() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const onClick = () => {
    if (username) {
      dispatch(addPlayerRequestAction(username));
      setUsername('');
    }
  };
  return (
    <div>
      <input
        value={username}
        placeholder="Add user"
        onChange={(event) => setUsername(event.target.value)}
        className="border rounded mr-1"
        title="Add user"
      />
      <button type="submit" aria-label="Add user" onClick={onClick}>
        <FontAwesomeIcon icon={faCheckCircle} />
      </button>
    </div>
  );
}
