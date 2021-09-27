package com.ladder.server.service;

import com.ladder.server.data.League;
import com.ladder.server.data.LeagueRepository;
import com.ladder.server.data.Player;
import com.ladder.server.data.PlayerRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class LeagueServiceTest {
  private AutoCloseable closeable;

  private LeagueService leagueService;

  @Mock private LeagueRepository leagueRepository;
  @Mock private PlayerRepository playerRepository;
  @Mock private League league;

  @BeforeEach
  void setUp() {
    this.closeable = MockitoAnnotations.openMocks(this);
    this.leagueService = new LeagueService(leagueRepository, playerRepository);
  }

  @AfterEach
  void cleanUp() throws Exception {
    this.closeable.close();
  }

  private final UUID uuid = UUID.randomUUID();
  private final Player player = new Player("player");

  @Test
  void handlePlayerAdded_withFoundLeagueAndPlayer_savesUpdatedLeague() {
    doReturn(Optional.of(league)).when(leagueRepository).findById(uuid);
    doReturn(Optional.of(player)).when(playerRepository).findById(uuid);

    leagueService.handlePlayerAdded(uuid, uuid);

    verify(leagueRepository, times(1)).save(league);
  }

  @Test
  void handlePlayerAdded_withNotFoundLeagueAndFoundPlayer_throwsRuntimeError() {
    doReturn(Optional.empty()).when(leagueRepository).findById(uuid);
    doReturn(Optional.of(player)).when(playerRepository).findById(uuid);

    assertThrows(RuntimeException.class, () -> leagueService.handlePlayerAdded(uuid, uuid));
    verify(leagueRepository, never()).save(any());
  }

  @Test
  void handlePlayerAdded_withFoundLeagueAndNotFoundPlayer_throwsRuntimeError() {
    doReturn(Optional.of(league)).when(leagueRepository).findById(uuid);
    doReturn(Optional.empty()).when(playerRepository).findById(uuid);

    assertThrows(RuntimeException.class, () -> leagueService.handlePlayerAdded(uuid, uuid));
    verify(leagueRepository, never()).save(any());
  }

  @Test
  void handlePlayerRemoved_withFoundLeagueAndFoundPlayer_savesUpdatedLeague() {
    doReturn(Optional.of(league)).when(leagueRepository).findById(uuid);
    doReturn(Optional.of(player)).when(playerRepository).findById(uuid);

    leagueService.handlePlayerRemoved(uuid, uuid);

    verify(leagueRepository, times(1)).save(league);
  }

  @Test
  void handlePlayerRemoved_withNotFoundLeagueAndFoundPlayer_throwsRuntimeError() {
    doReturn(Optional.empty()).when(leagueRepository).findById(uuid);
    doReturn(Optional.of(player)).when(playerRepository).findById(uuid);

    assertThrows(RuntimeException.class, () -> leagueService.handlePlayerRemoved(uuid, uuid));
    verify(leagueRepository, never()).save(any());
  }

  @Test
  void handlePlayerRemoved_withFoundLeagueAndNotFoundPlayer_throwsRuntimeError() {
    doReturn(Optional.of(league)).when(leagueRepository).findById(uuid);
    doReturn(Optional.empty()).when(playerRepository).findById(uuid);

    assertThrows(RuntimeException.class, () -> leagueService.handlePlayerRemoved(uuid, uuid));
    verify(leagueRepository, never()).save(any());
  }

  @Test
  void handleLeagueResult_withFoundLeagueAndFoundPlayer_savesUpdatedLeague() {
    doReturn(Optional.of(league)).when(leagueRepository).findById(uuid);
    doReturn(Optional.of(player)).when(playerRepository).findById(uuid);

    leagueService.handleLeagueResult(uuid, uuid, uuid);
    verify(leagueRepository, times(1)).save(league);
  }

  @Test
  void handleLeagueResult_withNotFoundLeagueAndFoundPlayer_throwsRuntimeError() {
    doReturn(Optional.empty()).when(leagueRepository).findById(uuid);
    doReturn(Optional.of(player)).when(playerRepository).findById(uuid);

    assertThrows(RuntimeException.class, () -> leagueService.handleLeagueResult(uuid, uuid, uuid));
    verify(leagueRepository, never()).save(any());
  }

  @Test
  void handleLeagueResult_withFoundLeagueAndNotFoundPlayer_throwsRuntimeError() {
    doReturn(Optional.of(league)).when(leagueRepository).findById(uuid);
    doReturn(Optional.empty()).when(playerRepository).findById(uuid);

    assertThrows(RuntimeException.class, () -> leagueService.handleLeagueResult(uuid, uuid, uuid));
    verify(leagueRepository, never()).save(any());
  }
}
