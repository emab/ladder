import { match as IMatch } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { playerByIdSelector } from './store';

interface IEditUserMatch extends IMatch {
  params: {
    userId: string;
  };
}

interface IEditUserProps {
  match: IEditUserMatch;
}

export function EditUser({ match }: IEditUserProps) {
  const user = useSelector(playerByIdSelector(match.params.userId));
  return (
    <div>
      Editing user: {user?.username} with id {user?.id}
    </div>
  );
}
