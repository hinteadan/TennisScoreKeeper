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
        scorePointFor();
        ok(game.points.length === 1);
    });

    test("Scoring a point is recorded per user", function () {
        var player = {};
        scorePointFor(player);
        ok(game.points[0].player === player);
    });

    function scorePointFor(player) {
        game.points.push({ player: player });
    }

}).call(this);