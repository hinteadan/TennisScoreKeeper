﻿(function (check, m, tsk, undefined) {
    "use strict";

    var gameEngine,
        fed = new m.Player("Roger Federer"),
        rafa = new m.Player("Rafael Nadal");

    module("Score projection", {
        setup: function () {
            gameEngine = new tsk.Engine(new m.MatchDefinition(fed, rafa));
        }
    });

    test("Basic projections", function () {
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: {
                Player: fed,
                Game: m.TennisPoints.Love,
                Games: 0,
                Sets: 0
            },
            PlayerTwo: {
                Player: rafa,
                Game: m.TennisPoints.Love,
                Games: 0,
                Sets: 0
            }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: {
                Player: fed,
                Game: m.TennisPoints.Fifteen,
                Games: 0,
                Sets: 0
            },
            PlayerTwo: {
                Player: rafa,
                Game: m.TennisPoints.Love,
                Games: 0,
                Sets: 0
            }
        }));
    });

}).call(this, this.H.Check, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);