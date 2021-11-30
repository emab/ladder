import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      type="button"
      className="p-1 mr-1 bg-blue-600 hover:bg-blue-500 rounded text-white"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};
