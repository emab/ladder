import React, { useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { submitLeagueResultAction } from '../../store/leagues';
import { LeagueId, Player } from '../../types';
import { leaguePlayerSelector } from './selectors';

const shouldItemRender = (item: Player, value: string): boolean =>
  item.username.toLowerCase().indexOf(value.toLowerCase()) > -1;

interface IResultInputProps {
  leagueId: LeagueId;
}

export function ResultInput({ leagueId }: IResultInputProps) {
  const dispatch = useDispatch();
  const [winningPlayerInput, setWinningPlayerInput] = useState('');
  const [winningPlayer, setWinningPlayer] = useState<Player>();

  const [losingPlayerInput, setLosingPlayerInput] = useState('');
  const [losingPlayer, setLosingPlayer] = useState<Player>();

  const players = useSelector(leaguePlayerSelector);

  const onResultSubmit = () => {
    if (winningPlayer && losingPlayer) {
      dispatch(
        submitLeagueResultAction(leagueId, winningPlayer.playerId, losingPlayer.playerId)
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
        items={players.filter((player) => player.playerId !== losingPlayer?.playerId)}
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
        items={players.filter((player) => player.playerId !== winningPlayer?.playerId)}
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
