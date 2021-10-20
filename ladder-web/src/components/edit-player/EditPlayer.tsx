import React from 'react';
import { useSelector } from 'react-redux';
import { match as IMatch } from 'react-router-dom';
import { playerByIdSelector } from '../../store';

interface IEditPlayerMatch extends IMatch {
  params: {
    playerId: string;
  };
}

interface IEditPlayerProps {
  match: IEditPlayerMatch;
}

export function EditPlayer({ match }: IEditPlayerProps) {
  const player = useSelector(playerByIdSelector(match.params.playerId));

  return (
    <div>
      <div className="flex flex-row">
        <div className="text-xl font-bold">
          Editing user: {player?.username}
        </div>
      </div>
    </div>
  );
}
