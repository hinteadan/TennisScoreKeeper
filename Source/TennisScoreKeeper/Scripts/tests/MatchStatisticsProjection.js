(function (tsk, m) {
    "use strict";

    var gameEngine,
        projector,
        stats,
        fed = new m.Player("Roger Federer"),
        rafa = new m.Player("Rafael Nadal");

    module('Match Statistics Projection', {
        setup: function () {
            var match = new m.MatchDefinition(fed, rafa);
            gameEngine = new tsk.Engine(match);
            projector = new tsk.MatchStatisticsProjector(match);
        }
    });

    test("Points count", function () {
        stats = projector.project(gameEngine.points);
        ok(stats.PerMatch.Overall.Points === 0);
        ok(stats.PerMatch.ForPlayerOne.Statistics.Points === 0);
        ok(stats.PerMatch.ForPlayerTwo.Statistics.Points === 0);
        ok(stats.PerMatch.PerSet[0].Overall.Points === 0);
        ok(stats.PerMatch.PerSet[0].ForPlayerOne.Statistics.Points === 0);
        ok(stats.PerMatch.PerSet[0].ForPlayerTwo.Statistics.Points === 0);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.Points === 0);
        ok(stats.PerMatch.PerSet[0].PerGame[0].ForPlayerOne.Statistics.Points === 0);
        ok(stats.PerMatch.PerSet[0].PerGame[0].ForPlayerTwo.Statistics.Points === 0);

        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing), false);
        stats = projector.project(gameEngine.points);
        ok(stats.PerMatch.Overall.Points === 1);
        ok(stats.PerMatch.ForPlayerOne.Statistics.Points === 1);
        ok(stats.PerMatch.ForPlayerTwo.Statistics.Points === 0);
        ok(stats.PerMatch.PerSet[0].Overall.Points === 1);
        ok(stats.PerMatch.PerSet[0].ForPlayerOne.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].ForPlayerTwo.Statistics.Points === 0);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.Points === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[0].ForPlayerOne.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[0].ForPlayerTwo.Statistics.Points === 0);

        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing), false);
        stats = projector.project(gameEngine.points);
        ok(stats.PerMatch.Overall.Points === 2);
        ok(stats.PerMatch.ForPlayerOne.Statistics.Points === 1);
        ok(stats.PerMatch.ForPlayerTwo.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].Overall.Points === 2);
        ok(stats.PerMatch.PerSet[0].ForPlayerOne.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].ForPlayerTwo.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.Points === 2);
        ok(stats.PerMatch.PerSet[0].PerGame[0].ForPlayerOne.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[0].ForPlayerTwo.Statistics.Points === 1);

        //Now FED will win first game and score one point in the next one
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing), false);
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing), false);
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing), false);
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing), false);
        stats = projector.project(gameEngine.points);
        ok(stats.PerMatch.Overall.Points === 6);
        ok(stats.PerMatch.ForPlayerOne.Statistics.Points === 5);
        ok(stats.PerMatch.ForPlayerTwo.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].Overall.Points === 6);
        ok(stats.PerMatch.PerSet[0].ForPlayerOne.Statistics.Points === 5);
        ok(stats.PerMatch.PerSet[0].ForPlayerTwo.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.Points === 5);
        ok(stats.PerMatch.PerSet[0].PerGame[0].ForPlayerOne.Statistics.Points === 4);
        ok(stats.PerMatch.PerSet[0].PerGame[0].ForPlayerTwo.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[1].Overall.Points === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[1].ForPlayerOne.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[1].ForPlayerTwo.Statistics.Points === 0);

        //Now FED will win first set and score one point in the next one
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing), false);
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing), false);
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing), false);
        //Score now is sets:0-0 games:2-0 game:0-0
        winOneGameFor(fed);//+4 points
        winOneGameFor(fed);//+4 points
        winOneGameFor(fed);//+4 points
        winOneGameFor(fed);//+4 points
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing), false);
        //Score now is sets:1-0 games:0-0 game:15-0

        stats = projector.project(gameEngine.points);
        ok(stats.PerMatch.Overall.Points === 26);
        ok(stats.PerMatch.ForPlayerOne.Statistics.Points === 25);
        ok(stats.PerMatch.ForPlayerTwo.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].Overall.Points === 25);
        ok(stats.PerMatch.PerSet[0].ForPlayerOne.Statistics.Points === 24);
        ok(stats.PerMatch.PerSet[0].ForPlayerTwo.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.Points === 5);
        ok(stats.PerMatch.PerSet[0].PerGame[0].ForPlayerOne.Statistics.Points === 4);
        ok(stats.PerMatch.PerSet[0].PerGame[0].ForPlayerTwo.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[1].Overall.Points === 4);
        ok(stats.PerMatch.PerSet[0].PerGame[1].ForPlayerOne.Statistics.Points === 4);
        ok(stats.PerMatch.PerSet[0].PerGame[1].ForPlayerTwo.Statistics.Points === 0);
        ok(stats.PerMatch.PerSet[1].PerGame[0].Overall.Points === 1);
        ok(stats.PerMatch.PerSet[1].PerGame[0].ForPlayerOne.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[1].PerGame[0].ForPlayerTwo.Statistics.Points === 0);
    });

    test("Common Statistics properties processing", function () {
        gameEngine.scorePointFor(fed, m.PointTypes.WinningShot(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.WinningShot(m.ShotStyles.NormalPassing), true);
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing), true);
        gameEngine.scorePointFor(fed, m.PointTypes.DoubleFault(m.ShotStyles.NormalPassing), true);
        gameEngine.scorePointFor(fed, m.PointTypes.ForcedError(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.UnforcedError(m.ShotStyles.NormalPassing), true);
        gameEngine.scorePointFor(fed, m.PointTypes.ForcedError(m.ShotStyles.NormalPassing), true);

        stats = projector.project(gameEngine.points);
        ok(stats.PerMatch.Overall.Points === 8);
        ok(stats.PerMatch.Overall.Serves === 1 * 3 + 2 * 5);
        ok(stats.PerMatch.Overall.Aces === 2);
        ok(stats.PerMatch.Overall.DoubleFaults === 1);
        ok(stats.PerMatch.Overall.UnforcedErrors === 1);
        ok(stats.PerMatch.Overall.ForcedErrors === 2);
        ok(stats.PerMatch.Overall.Winners === 2);
        ok(stats.PerMatch.Overall.WinnersIncludingAces === 4);
        ok(stats.PerMatch.Overall.BreakPoints === 1);
        ok(stats.PerMatch.Overall.BreakPointsWon === 1);

        ok(stats.PerMatch.PerSet[0].Overall.Points === 8);
        ok(stats.PerMatch.PerSet[0].Overall.Serves === 1 * 3 + 2 * 5);
        ok(stats.PerMatch.PerSet[0].Overall.Aces === 2);
        ok(stats.PerMatch.PerSet[0].Overall.DoubleFaults === 1);
        ok(stats.PerMatch.PerSet[0].Overall.UnforcedErrors === 1);
        ok(stats.PerMatch.PerSet[0].Overall.ForcedErrors === 2);
        ok(stats.PerMatch.PerSet[0].Overall.Winners === 2);
        ok(stats.PerMatch.PerSet[0].Overall.WinnersIncludingAces === 4);
        ok(stats.PerMatch.PerSet[0].Overall.BreakPoints === 1);
        ok(stats.PerMatch.PerSet[0].Overall.BreakPointsWon === 1);

        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.Points === 4);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.Serves === 6);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.Aces === 2);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.DoubleFaults === 0);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.UnforcedErrors === 0);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.ForcedErrors === 0);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.Winners === 2);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.WinnersIncludingAces === 4);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.BreakPoints === 0);
        ok(stats.PerMatch.PerSet[0].PerGame[0].Overall.BreakPointsWon === 0);

        ok(stats.PerMatch.PerSet[0].PerGame[1].Overall.Points === 4);
        ok(stats.PerMatch.PerSet[0].PerGame[1].Overall.Serves === 7);
        ok(stats.PerMatch.PerSet[0].PerGame[1].Overall.Aces === 0);
        ok(stats.PerMatch.PerSet[0].PerGame[1].Overall.DoubleFaults === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[1].Overall.UnforcedErrors === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[1].Overall.ForcedErrors === 2);
        ok(stats.PerMatch.PerSet[0].PerGame[1].Overall.Winners === 0);
        ok(stats.PerMatch.PerSet[0].PerGame[1].Overall.WinnersIncludingAces === 0);
        ok(stats.PerMatch.PerSet[0].PerGame[1].Overall.BreakPoints === 1);
        ok(stats.PerMatch.PerSet[0].PerGame[1].Overall.BreakPointsWon === 1);
    });

    function winOneGameFor(player) {
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
    }

}).call(this, this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Model);