﻿(function (check, m, tsk, undefined) {
    "use strict";

    var gameEngine,
        projector,
        score,
        fed = new m.Player("Roger Federer"),
        rafa = new m.Player("Rafael Nadal");

    module('Detailed Score Projection', {
        setup: function () {
            var match = new m.MatchDefinition(fed, rafa);
            gameEngine = new tsk.Engine(match);
            projector = new tsk.DetailedScoreProjector(match);
        }
    });

    test("Game score", function () {
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.GameScore() === 0 && score.PlayerTwo.Score.GameScore() === 0);

        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.GameScore() === 1 && score.PlayerTwo.Score.GameScore() === 0);

        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.GameScore() === 2 && score.PlayerTwo.Score.GameScore() === 0);

        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.GameScore() === 2 && score.PlayerTwo.Score.GameScore() === 1);

        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.GameScore() === 2 && score.PlayerTwo.Score.GameScore() === 2);

        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.GameScore() === 3 && score.PlayerTwo.Score.GameScore() === 2);

        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.GameScore() === 0 && score.PlayerTwo.Score.GameScore() === 0);
    });

    test("Set score", function () {
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.SetScore() === 0 && score.PlayerTwo.Score.SetScore() === 0);

        winOneGameFor(fed);
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.SetScore() === 1 && score.PlayerTwo.Score.SetScore() === 0);

        winOneGameFor(fed);
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.SetScore() === 2 && score.PlayerTwo.Score.SetScore() === 0);

        winOneGameFor(rafa);
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.SetScore() === 2 && score.PlayerTwo.Score.SetScore() === 1);

        winOneGameFor(fed);
        winOneGameFor(fed);
        winOneGameFor(fed);
        winOneGameFor(fed);
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.SetScore() === 0 && score.PlayerTwo.Score.SetScore() === 0);
    });

    test("Set score with tiebreak", function () {
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.SetScore() === 0 && score.PlayerTwo.Score.SetScore() === 0);

        winOneGameFor(fed);
        winOneGameFor(fed);
        winOneGameFor(fed);
        winOneGameFor(fed);
        winOneGameFor(fed);
        winOneGameFor(rafa);
        winOneGameFor(rafa);
        winOneGameFor(rafa);
        winOneGameFor(rafa);
        winOneGameFor(rafa);
        winOneGameFor(rafa);
        winOneGameFor(fed);
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.SetScore() === 6 && score.PlayerTwo.Score.SetScore() === 6);

        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));

        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.SetScore() === 0 && score.PlayerTwo.Score.SetScore() === 0);
        ok(score.PlayerOne.Score.Sets[score.PlayerOne.Score.Sets.length - 2].Score() === 7
            && score.PlayerTwo.Score.Sets[score.PlayerTwo.Score.Sets.length - 2].Score() === 6);
        ok(score.PlayerOne.Score.Sets[score.PlayerOne.Score.Sets.length - 2].Score() === 7
            && score.PlayerTwo.Score.Sets[score.PlayerTwo.Score.Sets.length - 2].Score() === 6);
        ok(score.PlayerOne.Score.Sets[score.PlayerOne.Score.Sets.length - 2].TiebreakGame.Score() === 7
            && score.PlayerTwo.Score.Sets[score.PlayerTwo.Score.Sets.length - 2].TiebreakGame.Score() === 1);
    });

    test("Match score", function () {
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.Score() === 0 && score.PlayerTwo.Score.Score() === 0);

        winOneSetFor(fed);
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.Score() === 1 && score.PlayerTwo.Score.Score() === 0);

        winOneSetFor(rafa);
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.Score() === 1 && score.PlayerTwo.Score.Score() === 1);

        winOneSetFor(fed);
        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.Score() === 2 && score.PlayerTwo.Score.Score() === 1);
    });

    function winOneGameFor(player) {
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
    }

    function winOneSetFor(player) {
        winOneGameFor(player);
        winOneGameFor(player);
        winOneGameFor(player);
        winOneGameFor(player);
        winOneGameFor(player);
        winOneGameFor(player);
    }

}).call(this, this.H.Check, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);