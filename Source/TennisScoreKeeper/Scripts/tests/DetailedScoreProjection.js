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

    test("Simple games", function () {
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

}).call(this, this.H.Check, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);