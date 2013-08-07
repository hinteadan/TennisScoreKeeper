(function (check, m, tsk, undefined) {
    "use strict";

    var gameEngine,
        fed = new m.Player("Roger Federer"),
        rafa = new m.Player("Rafael Nadal"),
        tennisPoints = {
            Love: {},
            Fifteen: {},
            Thirty: {},
            Fourty: {},
            Advantage: {}
        };

    module("Scoring", {
        setup: function () {
            gameEngine = new tsk.Engine(new m.MatchDefinition(fed, rafa));
        }
    });

    test("Perfect game scoring", function () {
        ok(gameEngine.players[0].Score.Game === tennisPoints.Love
            && gameEngine.players[1].Score.Game === tennisPoints.Love, "0-0");
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === tennisPoints.Fifteen
            && gameEngine.players[1].Score.Game === tennisPoints.Love, "15-0");
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === tennisPoints.Thirty
            && gameEngine.players[1].Score.Game === tennisPoints.Love, "30-0");
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === tennisPoints.Fourty
            && gameEngine.players[1].Score.Game === tennisPoints.Love, "40-0");
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.players[0].Score.Game === tennisPoints.Love
            && gameEngine.players[1].Score.Game === tennisPoints.Love, "0-0");
    });

}).call(this, this.H.Check, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);