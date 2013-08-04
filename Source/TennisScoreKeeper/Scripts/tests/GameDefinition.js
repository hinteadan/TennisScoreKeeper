(function (S) {
    "use strict";

    var game,
        gameTieModes = {
            advantageWin: {},
            singlePointWin: {}
        },
        lastSetTieModes = {
            tiebreak: {},
            superTiebreak: {},
            gameDifference: {}
        };

    module("Game Definition", {
        setup: function () {
            game = createGame();
        }
    });

    test("A game must be created with two player", function () {
        ok(game.players.length == 2);
    });

    test("Each player must have a unique name", function () {
        ok(!S(game.players[0].name).isEmpty());
        ok(!S(game.players[1].name).isEmpty());
        ok(S(game.players[0].name).trim().toUpperCase().s
            != S(game.players[1].name).trim().toUpperCase().s);
    });

    test("The game must define games per set, defaulting to 6", function () {
        ok(game.gamesPerSet === 6);
    });

    test("The game must define maximum number of sets, defaulting to 3", function () {
        ok(game.setsCount === 3);
    });

    test("The game must define tie mode for a game, defaulting to Advantage win", function () {
        ok(game.gameTieMode === gameTieModes.advantageWin);
    });

    test("The game must define last set tie mode, defaulting to Tiebreak", function () {
        ok(game.lastSetTieMode === lastSetTieModes.tiebreak);
    });

    test("The game must define the starting player", function () {
        ok(game.startingPlayer === game.players[0]
            || game.startingPlayer === game.players[1]);
    });

    function createGame() {
        var players = [
            { name: 'Player 1' },
            { name: 'Player 2' }
        ];

        return {
            players: players,
            gamesPerSet: 6,
            setsCount: 3,
            gameTieMode: gameTieModes.advantageWin,
            lastSetTieMode: lastSetTieModes.tiebreak,
            startingPlayer: players[0]
        };
    }

}).call(this, S);