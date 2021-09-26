import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ControlBar } from './ControlBar';
import { fetchPlayersAction } from './store';
import { fetchLeaguesAction } from './store/leagues';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayersAction());
    dispatch(fetchLeaguesAction());
  }, []);

  return (
    <div className="bg-blue-300">
      <ControlBar />
    </div>
  );
}

export default App;
