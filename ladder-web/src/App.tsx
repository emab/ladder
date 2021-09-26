import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ControlBar } from './ControlBar';
import { fetchPlayersAction } from './store';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayersAction());
  }, []);

  return (
    <div className="bg-blue-300">
      <ControlBar />
    </div>
  );
}

export default App;
