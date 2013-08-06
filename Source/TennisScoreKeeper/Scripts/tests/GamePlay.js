(function (undefined) {
    "use strict";

    var game,
        player = {};

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

    test("Scoring a point is recorded per player", function () {
        scorePointFor(player);
        ok(game.points[0].player === player);
    });

    test("Scoring a point mandatory stuff", function () {
        scorePointFor(player);
        ok(notEmpty(game.points[0].creditedTo), "creditedTo");
        ok(notEmpty(game.points[0].timestamp), "timestamp");
        ok(notEmpty(game.points[0].type), "type");
    });

    test("A scored point can be undone", function () {
        scorePointFor(player);
        undo();
        ok(game.points.length === 0);
        scorePointFor(player);
        scorePointFor(player);
        undo();
        ok(game.points.length === 1);
    });

    function scorePointFor(player) {
        game.points.push({
            player: player,
            creditedTo: player,
            timestamp: new Date(),
            type: {}
        });
    }

    function undo() {
        game.points.pop();
    }

    function notEmpty(field) {
        return field != undefined
            && field != null
        ;
    }

}).call(this);