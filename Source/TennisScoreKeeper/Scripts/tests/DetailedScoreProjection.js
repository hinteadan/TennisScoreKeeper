(function (check, m, tsk, undefined) {
    "use strict";

    var gameEngine,
        projector,
        fed = new m.Player("Roger Federer"),
        rafa = new m.Player("Rafael Nadal");

    module('Detailed Score Projection', {
        setup: function () {
            var match = new m.MatchDefinition(fed, rafa);
            gameEngine = new tsk.Engine(match);
            projector = new tsk.DetailedScoreProjector(match);
        }
    });

    test("Dummy", function () {

    });

}).call(this, this.H.Check, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);