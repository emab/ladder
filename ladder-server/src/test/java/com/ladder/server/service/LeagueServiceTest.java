package com.ladder.server.service;

import com.ladder.server.data.LeaderboardEntry;
import com.ladder.server.data.League;
import com.ladder.server.data.LeagueRepository;
import com.ladder.server.data.Player;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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

  private Map<UUID, LeaderboardEntry> getMockLeaderboard(Integer[] ranks, Player[] players) {
    var leaderboard = new HashMap<UUID, LeaderboardEntry>();
    for (int i = 0; i < ranks.length; i++) {
      leaderboard.put(players[i].getId(), new LeaderboardEntry(ranks[i], players[i]));
    }

    return leaderboard;
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
  void handlePlayerAdded_withNotFoundLeague_throwsResponseStatusExceptionAndDoesNotSave() {
    var mockPlayer = new Player("Test");
    var mockUUID = UUID.randomUUID();
    var mockLeagueOptional = Optional.empty();

    doReturn(mockLeagueOptional).when(leagueRepository).findById(mockUUID);

    assertThrows(
        ResponseStatusException.class, () -> leagueService.handlePlayerAdded(mockPlayer, mockUUID));
    verify(leagueRepository, never()).save(any());
  }

  @Test
  void handlePlayerRemoved_withFoundLeague_removesNoRankPlayerWithoutChangingOtherRanks() {
    var mockUUID = UUID.randomUUID();
    var mockLeague = new League("League");
    var mockPlayer_noRank = new Player("No rank");
    var mockPlayer_bottomRank = new Player("Bottom rank");
    var mockPlayer_topRank = new Player("Top rank");
    var mockLeaderboard =
        getMockLeaderboard(
            new Integer[] {null, 2, 1},
            new Player[] {mockPlayer_noRank, mockPlayer_bottomRank, mockPlayer_topRank});
    mockLeague.setLeaderboard(mockLeaderboard);

    doReturn(Optional.of(mockLeague)).when(leagueRepository).findById(mockUUID);

    var expectedLeaderboard =
        getMockLeaderboard(
            new Integer[] {2, 1}, new Player[] {mockPlayer_bottomRank, mockPlayer_topRank});

    leagueService.handlePlayerRemoved(mockPlayer_noRank, mockUUID);

    assertNull(mockLeague.getLeaderboard().get(mockPlayer_noRank.getId()));
    verify(leagueRepository)
        .save(
            argThat(
                arg -> {
                  assertEquals(arg.getLeaderboard(), expectedLeaderboard);
                  return true;
                }));
  }

  @Test
  void handlePlayerRemoved_withFoundLeague_removesBottomRankPlayerAndDoesNotChangeScoreboard() {
    var mockUUID = UUID.randomUUID();
    var mockLeague = new League("League");
    var mockPlayer_noRank = new Player("No rank");
    var mockPlayer_bottomRank = new Player("Bottom rank");
    var mockPlayer_topRank = new Player("Top rank");
    var mockLeaderboard =
        getMockLeaderboard(
            new Integer[] {null, 2, 1},
            new Player[] {mockPlayer_noRank, mockPlayer_bottomRank, mockPlayer_topRank});
    mockLeague.setLeaderboard(mockLeaderboard);

    doReturn(Optional.of(mockLeague)).when(leagueRepository).findById(mockUUID);

    var expectedLeaderboard =
        getMockLeaderboard(
            new Integer[] {null, 1}, new Player[] {mockPlayer_noRank, mockPlayer_topRank});

    leagueService.handlePlayerRemoved(mockPlayer_bottomRank, mockUUID);

    assertNull(mockLeague.getLeaderboard().get(mockPlayer_bottomRank.getId()));
    verify(leagueRepository)
        .save(
            argThat(
                arg -> {
                  assertEquals(arg.getLeaderboard(), expectedLeaderboard);
                  return true;
                }));
  }

  @Test
  void handlePlayerRemoved_withFoundLeague_removesHighRankedPlayerAndUpdatesScoreboard() {
    var mockUUID = UUID.randomUUID();
    var mockLeague = new League("League");
    var mockPlayer_noRank = new Player("No rank");
    var mockPlayer_bottomRank = new Player("Bottom rank");
    var mockPlayer_topRank = new Player("Top rank");
    var mockLeaderboard =
        getMockLeaderboard(
            new Integer[] {null, 2, 1},
            new Player[] {mockPlayer_noRank, mockPlayer_bottomRank, mockPlayer_topRank});
    mockLeague.setLeaderboard(mockLeaderboard);

    doReturn(Optional.of(mockLeague)).when(leagueRepository).findById(mockUUID);

    var expectedLeaderboard =
        getMockLeaderboard(
            new Integer[] {null, 1}, new Player[] {mockPlayer_noRank, mockPlayer_bottomRank});

    leagueService.handlePlayerRemoved(mockPlayer_topRank, mockUUID);

    assertNull(mockLeague.getLeaderboard().get(mockPlayer_topRank.getId()));
    verify(leagueRepository)
        .save(
            argThat(
                arg -> {
                  assertEquals(arg.getLeaderboard(), expectedLeaderboard);
                  return true;
                }));
  }

  @Test
  void handlePlayerRemoved_withNotFoundLeague_throwsResponseStatusExceptionAndDoesNotSave() {
    var mockUUID = UUID.randomUUID();
    var mockPlayer = new Player("Mock");

    doReturn(Optional.empty()).when(leagueRepository).findById(mockUUID);

    assertThrows(
        ResponseStatusException.class,
        () -> leagueService.handlePlayerRemoved(mockPlayer, mockUUID));
    verify(leagueRepository, never()).save(any());
  }

  @Test
  void
      handleLeagueResult_withFoundLeague_withNullLoserAndWinnerRank_setsAtBottomTwoAvailableRanks() {
    var mockLeagueId = UUID.randomUUID();
    var league = new League("League");
    var winner = new Player("Winner");
    var loser = new Player("Loser");
    var winnerId = winner.getId();
    var loserId = loser.getId();
    var middlePlayer = new Player("2");
    var topPlayer = new Player("1");
    var leaderboard =
        getMockLeaderboard(
            new Integer[] {null, null, 2, 1},
            new Player[] {loser, winner, middlePlayer, topPlayer});
    league.setLeaderboard(leaderboard);

    doReturn(Optional.of(league)).when(leagueRepository).findById(mockLeagueId);
    leagueService.handleLeagueResult(mockLeagueId, winnerId, loserId);

    var expectedLeaderboard =
        getMockLeaderboard(
            new Integer[] {4, 3, 2, 1}, new Player[] {loser, winner, middlePlayer, topPlayer});
    verify(leagueRepository)
        .save(
            argThat(
                arg -> {
                  assertEquals(arg.getLeaderboard(), expectedLeaderboard);
                  return true;
                }));
  }

  // TODO more league service tests for other cases
}
