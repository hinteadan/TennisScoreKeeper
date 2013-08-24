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

    test("Match stats", function () {
        ok(1==1);
    });

}).call(this, this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Model);