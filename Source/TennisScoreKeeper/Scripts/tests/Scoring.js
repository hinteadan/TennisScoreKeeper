(function (check, m, tsk, undefined) {
    "use strict";

    var gameEngine,
        fed = new m.Player("Roger Federer"),
        rafa = new m.Player("Rafael Nadal");

    module("Scoring", {
        setup: function () {
            gameEngine = new tsk.Engine(new m.MatchDefinition(fed, rafa));
        }
    });

    test("Perfect game scoring", function () {
        ok(gameEngine.players[0].Score.Game === m.TennisPoints.Love
            && gameEngine.players[1].Score.Game === m.TennisPoints.Love, "0-0");
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === m.TennisPoints.Fifteen
            && gameEngine.players[1].Score.Game === m.TennisPoints.Love, "15-0");
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === m.TennisPoints.Thirty
            && gameEngine.players[1].Score.Game === m.TennisPoints.Love, "30-0");
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === m.TennisPoints.Fourty
            && gameEngine.players[1].Score.Game === m.TennisPoints.Love, "40-0");
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === m.TennisPoints.Love
            && gameEngine.players[1].Score.Game === m.TennisPoints.Love, "0-0");
    });

    test("Tie game for some time than win", function () {
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === m.TennisPoints.Fourty
            && gameEngine.players[1].Score.Game === m.TennisPoints.Fourty, "Deuce");
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === m.TennisPoints.Advantage
            && gameEngine.players[1].Score.Game === m.TennisPoints.Fourty, "Advantage");
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === m.TennisPoints.Fourty
            && gameEngine.players[1].Score.Game === m.TennisPoints.Fourty, "Deuce");
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === m.TennisPoints.Fourty
            && gameEngine.players[1].Score.Game === m.TennisPoints.Advantage, "Advantage");
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === m.TennisPoints.Fourty
            && gameEngine.players[1].Score.Game === m.TennisPoints.Fourty, "Deuce");
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === m.TennisPoints.Advantage
            && gameEngine.players[1].Score.Game === m.TennisPoints.Fourty, "Advantage");
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === m.TennisPoints.Love
            && gameEngine.players[1].Score.Game === m.TennisPoints.Love, "0-0");
        ok(gameEngine.players[0].Points.length === 7, "Player 1 total number of points");
        ok(gameEngine.players[1].Points.length === 5, "Player 2 total number of points");
    });

}).call(this, this.H.Check, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);