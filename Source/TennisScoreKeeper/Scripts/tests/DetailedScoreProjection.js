(function (check, m, tsk, undefined) {
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
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));

        score = projector.projectScore(gameEngine.points);
        ok(score.PlayerOne.Score.SetScore() === 0 && score.PlayerTwo.Score.SetScore() === 0);
    });

    function winOneGameFor(player) {
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
    }

}).call(this, this.H.Check, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);