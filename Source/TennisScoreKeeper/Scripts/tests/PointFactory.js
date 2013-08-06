(function (m, tsk) {
    "use strict";

    var players = [
            new m.Player("Roger Federer"),
            new m.Player("Rafael Nadal")
        ],
        factory = new tsk.PointFactory(players);

    module("Point Factory");

    test("Dummy", function () {
        
    });

}).call(this, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);