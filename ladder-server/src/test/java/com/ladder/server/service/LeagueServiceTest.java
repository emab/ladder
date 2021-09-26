package com.ladder.server.service;

import com.ladder.server.data.League;
import com.ladder.server.data.LeagueRepository;
import com.ladder.server.data.Player;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doReturn;

class LeagueServiceTest {
  private AutoCloseable closeable;

  private LeagueService leagueService;

  @Mock private LeagueRepository leagueRepository;

  @BeforeEach
  void setUp() {
    closeable = MockitoAnnotations.openMocks(this);
    leagueService = new LeagueService(leagueRepository);
  }

  @AfterEach
  void cleanUp() throws Exception {
    closeable.close();
  }

  @Test
  void handlePlayerAdded_withFoundLeague_addsPlayerToLeague() {
    var mockPlayer = new Player("Test");
    var mockUUID = UUID.randomUUID();
    var mockLeague = new League("Test league");
    var mockLeagueOptional = Optional.of(mockLeague);

    doReturn(mockLeagueOptional).when(leagueRepository).findById(mockUUID);
    leagueService.handlePlayerAdded(mockPlayer, mockUUID);

    assertEquals(mockLeague.getLeaderboard().get(mockPlayer.getId()).getPlayer(), mockPlayer);
  }

  @Test
  void handlePlayerAdded_withNotFoundLeague_throwsError() {
    var mockPlayer = new Player("Test");
    var mockUUID = UUID.randomUUID();
    var mockLeagueOptional = Optional.empty();

    doReturn(mockLeagueOptional).when(leagueRepository).findById(mockUUID);

    assertThrows(
        ResponseStatusException.class,
        () -> leagueService.handlePlayerAdded(mockPlayer, mockUUID));
  }

  @Test
  void handlePlayerRemoved() {}

  @Test
  void handleLeagueResult() {}
}
