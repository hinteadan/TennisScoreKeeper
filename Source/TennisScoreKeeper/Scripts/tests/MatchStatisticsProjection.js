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

        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing), false);
        stats = projector.project(gameEngine.points);
        ok(stats.PerMatch.Overall.Points === 1);
        ok(stats.PerMatch.ForPlayerOne.Statistics.Points === 1);
        ok(stats.PerMatch.ForPlayerTwo.Statistics.Points === 0);
        ok(stats.PerMatch.PerSet[0].Overall.Points === 1);
        ok(stats.PerMatch.PerSet[0].ForPlayerOne.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].ForPlayerTwo.Statistics.Points === 0);

        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing), false);
        stats = projector.project(gameEngine.points);
        ok(stats.PerMatch.Overall.Points === 2);
        ok(stats.PerMatch.ForPlayerOne.Statistics.Points === 1);
        ok(stats.PerMatch.ForPlayerTwo.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].Overall.Points === 2);
        ok(stats.PerMatch.PerSet[0].ForPlayerOne.Statistics.Points === 1);
        ok(stats.PerMatch.PerSet[0].ForPlayerTwo.Statistics.Points === 1);
    });

}).call(this, this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Model);