import React from 'react';
import { Link } from 'react-router-dom';

export function ControlBar() {
  return (
    <div className="flex w-full items-end p-2">
      <Link
        to="/"
        className="p-1 mr-1 bg-blue-600 hover:bg-blue-500 rounded text-white"
      >
        Home
      </Link>
      <Link
        to="/players"
        className="p-1 mr-1 bg-blue-600 hover:bg-blue-500 rounded text-white"
      >
        Players
      </Link>
    </div>
  );
}