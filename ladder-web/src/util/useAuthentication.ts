import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setAuthenticationTokenAction,
  setIsAuthenticatedAction,
  setUserAction,
} from '../store/authentication';

/**
 * Hook to use Auth0 authentication.
 *
 * Stores some useful stuff like token, userId and some basic user info in the store.
 */
export const useAuthentication = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      dispatch(setAuthenticationTokenAction(token));
    };

    if (isAuthenticated && user && user?.sub) {
      dispatch(setIsAuthenticatedAction(true));
      dispatch(
        setUserAction({
          name: user?.name ?? user.email ?? '',
          id: user.sub,
        })
      );
      getToken();
    } else {
      dispatch(setIsAuthenticatedAction(false));
    }
  }, [isAuthenticated]);

  return { isAuthenticated };
};
