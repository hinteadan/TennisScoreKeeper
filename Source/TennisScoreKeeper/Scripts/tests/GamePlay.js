(function (check, m, tsk, undefined) {
    "use strict";

    var gameEngine;

    module("Game Play", {
        setup: function () {
            gameEngine = new tsk.Engine(
                new m.MatchDefinition(
                    new m.Player("Player 1"),
                    new m.Player("Player 2")
                    )
                );
        }
    });

    test("Scoring a point is recorded", function () {
        gameEngine.scorePointFor(gameEngine.players[0], {});
        ok(gameEngine.points.length === 1);
    });

    test("Scoring a point is recorded per player", function () {
        gameEngine.scorePointFor(gameEngine.players[0], {});
        ok(gameEngine.points[0].player === gameEngine.players[0]);
    });

    test("Scoring a point mandatory stuff", function () {
        gameEngine.scorePointFor(gameEngine.players[0], {});
        ok(check.isNotEmpty(gameEngine.points[0].creditedTo), "creditedTo");
        ok(check.isNotEmpty(gameEngine.points[0].timestamp), "timestamp");
        ok(check.isNotEmpty(gameEngine.points[0].type), "type");
    });

    test("A scored point can be undone", function () {
        gameEngine.scorePointFor(gameEngine.players[0], {});
        gameEngine.undoLatestPoint();
        ok(gameEngine.points.length === 0);
        gameEngine.scorePointFor(gameEngine.players[0], {});
        gameEngine.scorePointFor(gameEngine.players[0], {});
        gameEngine.undoLatestPoint();
        ok(gameEngine.points.length === 1);
    });

}).call(this, this.H.Check, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);