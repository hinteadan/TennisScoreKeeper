(function () {
    "use strict";

    var game;

    module("Game Play", {
        setup: function () {
            game = {
                points: []
            };
        }
    });

    test("Scoring a point is recorded", function () {
        scorePoint();
        ok(game.points.length === 1);
    });

    function scorePoint() {
        game.points.push({});
    }

}).call(this);