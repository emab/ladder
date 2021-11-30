import React, { ReactChild } from 'react';
import { NavLink as BaseNavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from '../login-button/LoginButton';
import { LogoutButton } from '../logout-button/LogoutButton';

interface NavLinkProps {
  to: string;
  children: ReactChild;
}

const NavLink = ({ to, children }: NavLinkProps) => (
  <BaseNavLink
    to={to}
    exact
    activeClassName="bg-blue-700"
    className="p-1 mr-1 bg-blue-600 hover:bg-blue-500 rounded text-white"
  >
    {children}
  </BaseNavLink>
);

export const ControlBar = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div className="flex w-full justify-end p-2">
        <LoginButton />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-between p-2">
      <div className="flex items-center">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <LogoutButton />
    </div>
  );
};
