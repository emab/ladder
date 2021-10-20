package com.ladder.server.service;

import com.ladder.server.data.Challenge;
import com.ladder.server.data.Player;
import com.ladder.server.data.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
  private final PlayerRepository playerRepository;
  private final ServiceUtils<Player, PlayerRepository> playerUtils;
  private final ChallengeService challengeService;

  public PlayerService(PlayerRepository playerRepository, ChallengeService challengeService) {
    this.playerRepository = playerRepository;
    this.playerUtils = new ServiceUtils<>(playerRepository);
    this.challengeService = challengeService;
  }

  public List<Player> getPlayers() {
      return playerRepository.findAll();
  }

  public Player getPlayer(Integer playerId) {
      return playerUtils.findOrThrow(playerId);
  }

  public Player addPlayer(String username) {
      return playerRepository.save(new Player(username));
  }

  public Player deletePlayer(Integer playerId) {
      var player = playerUtils.findOrThrow(playerId);
      playerRepository.delete(player);
      return player;
  }
}
