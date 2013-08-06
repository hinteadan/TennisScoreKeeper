(function (S, Model) {
    "use strict";

    var game;

    module("Game Definition", {
        setup: function () {
            game = new Model.MatchDefinition(
                new Model.Player("Player 1"),
                new Model.Player("Player 2")
            );
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
        ok(game.gameTieMode === Model.TieMode.advantageWin);
    });

    test("The game must define last set tie mode, defaulting to Tiebreak", function () {
        ok(game.lastSetTieMode === Model.LastSetTieMode.tiebreak);
    });

    test("The game must define the starting player", function () {
        ok(game.startingPlayer === game.players[0]
            || game.startingPlayer === game.players[1]);
    });

}).call(this, S, this.H.TennisScoreKeeper.Model);