(function (check, m, tsk, undefined) {
    "use strict";

    var gameEngine,
        fed = new m.Player("Roger Federer"),
        rafa = new m.Player("Rafael Nadal");

    module('Detailed Score Projection', {
        setup: function () {
            gameEngine = new tsk.Engine(new m.MatchDefinition(fed, rafa));
        }
    });

    test("Dummy", function () {

    });

}).call(this, this.H.Check, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);