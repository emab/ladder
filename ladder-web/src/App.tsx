import React, { useEffect } from 'react';

import { ControlBar } from './components';
import { Router } from './Router';
import { useAuthentication } from './util/useAuthentication';
import { useDispatch } from 'react-redux';
import { fetchData } from './store/appActions';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchData());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <div className="bg-blue-300">
        <ControlBar />
      </div>
      {isAuthenticated && (
        <div className="p-2">
          <Router />
        </div>
      )}
    </>
  );
}

export default App;
