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
        ok(gameEngine.tennisScore().ServingPlayer() === fed);
        gameEngine = new tsk.Engine(new m.MatchDefinition(fed, rafa, true));
        ok(gameEngine.tennisScore().ServingPlayer() === rafa);
    });

    test("Change of serve after games", function () {
        ok(gameEngine.tennisScore().ServingPlayer() === fed);
        winOnePerfectGameFor(fed);
        ok(gameEngine.tennisScore().ServingPlayer() === rafa);
        winOnePerfectGameFor(fed);
        ok(gameEngine.tennisScore().ServingPlayer() === fed);
    });

    test("Change of serve with tie breaks", function () {
        ok(gameEngine.tennisScore().ServingPlayer() === fed);
        winOnePerfectSetFor(fed, 6);
        winOnePerfectSetFor(rafa, 6);
        ok(gameEngine.tennisScore().ServingPlayer() === fed);
        
        winOnePerfectGameFor(fed);
        winOnePerfectGameFor(fed);
        winOnePerfectGameFor(fed);
        winOnePerfectGameFor(fed);
        winOnePerfectGameFor(fed);

        winOnePerfectGameFor(rafa);
        winOnePerfectGameFor(rafa);
        winOnePerfectGameFor(rafa);
        winOnePerfectGameFor(rafa);
        winOnePerfectGameFor(rafa);

        winOnePerfectGameFor(fed);
        ok(gameEngine.tennisScore().ServingPlayer() === rafa);
        winOnePerfectGameFor(rafa);

        ok(gameEngine.tennisScore().ServingPlayer() === fed);

        //Tiebreak start
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.tennisScore().ServingPlayer() === rafa);
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.tennisScore().ServingPlayer() === fed);
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.tennisScore().ServingPlayer() === rafa);
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(gameEngine.tennisScore().ServingPlayer() === fed);

    });

    function winOnePerfectGameFor(player) {
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
    }

    function winOnePerfectSetFor(player, gamesPerSet) {
        for (var i = 0; i < gamesPerSet; i++) {
            winOnePerfectGameFor(player);
        }
    }

}).call(this, this.H.Check, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);