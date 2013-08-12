(function (check, m, tsk, undefined) {
    "use strict";

    var gameEngine,
        fed = new m.Player("Roger Federer"),
        rafa = new m.Player("Rafael Nadal");

    module("Serving player", {
        setup: function () {
            gameEngine = new tsk.Engine(new m.MatchDefinition(fed, rafa));
        }
    });

    test("First to serve", function () {
        ok(gameEngine.ServingPlayer() === fed);
        gameEngine = new tsk.Engine(new m.MatchDefinition(fed, rafa, true));
        ok(gameEngine.ServingPlayer() === rafa);
    });

}).call(this, this.H.Check, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);