import React, { useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { playersArraySelector } from '../../store';
import { submitLeagueResultAction } from '../../store/leagues';
import { Player } from '../../types';

const shouldItemRender = (item: Player, value: string): boolean =>
  item.username.toLowerCase().indexOf(value.toLowerCase()) > -1;

interface IResultInputProps {
  leagueId: string;
}

export function ResultInput({ leagueId }: IResultInputProps) {
  const dispatch = useDispatch();
  const [winningPlayerInput, setWinningPlayerInput] = useState('');
  const [winningPlayer, setWinningPlayer] = useState<Player>();

  const [losingPlayerInput, setLosingPlayerInput] = useState('');
  const [losingPlayer, setLosingPlayer] = useState<Player>();

  const players = useSelector(playersArraySelector);

  const onResultSubmit = () => {
    if (winningPlayer && losingPlayer) {
      dispatch(
        submitLeagueResultAction(leagueId, winningPlayer.id, losingPlayer.id)
      );
      setWinningPlayerInput('');
      setWinningPlayer(undefined);
      setLosingPlayerInput('');
      setLosingPlayer(undefined);
    }
  };

  return (
    <div className="mx-5">
      Winner:{' '}
      <Autocomplete
        items={players.filter((player) => player.id !== losingPlayer?.id)}
        shouldItemRender={shouldItemRender}
        value={winningPlayerInput}
        onChange={(e) => {
          setWinningPlayerInput(e.target.value);
          setWinningPlayer(undefined);
        }}
        getItemValue={(player) => player.username}
        renderItem={(item, isHighlighted) => (
          <div className={isHighlighted ? 'bg-blue-400' : ''}>
            {item.username}
          </div>
        )}
        onSelect={(val, winner) => {
          setWinningPlayerInput(val);
          setWinningPlayer(winner);
        }}
        inputProps={{ className: 'border rounded mx-2' }}
      />
      Loser:{' '}
      <Autocomplete
        items={players.filter((player) => player.id !== winningPlayer?.id)}
        shouldItemRender={shouldItemRender}
        value={losingPlayerInput}
        onChange={(e) => {
          setLosingPlayerInput(e.target.value);
          setLosingPlayer(undefined);
        }}
        getItemValue={(player) => player.username}
        renderItem={(item, isHighlighted) => (
          <div key={item.id} className={isHighlighted ? 'bg-blue-400' : ''}>
            {item.username}
          </div>
        )}
        onSelect={(val, loser) => {
          setLosingPlayerInput(val);
          setLosingPlayer(loser);
        }}
        inputProps={{ className: 'border rounded mx-2' }}
      />
      <button
        type="button"
        onClick={onResultSubmit}
        className="bg-blue-600 hover:bg-blue-500 rounded p-1 text-white"
      >
        Submit Result
      </button>
    </div>
  );
}
