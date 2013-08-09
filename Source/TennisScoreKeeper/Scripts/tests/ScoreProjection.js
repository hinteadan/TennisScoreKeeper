(function (check, m, tsk, undefined) {
    "use strict";

    var gameEngine,
        fed = new m.Player("Roger Federer"),
        rafa = new m.Player("Rafael Nadal");

    module("Score projection", {
        setup: function () {
            gameEngine = new tsk.Engine(new m.MatchDefinition(fed, rafa));
        }
    });

    test("Perfect game projections", function () {
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Fifteen, GamePoints: 1, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Thirty, GamePoints: 2, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Fourty, GamePoints: 3, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 4, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
    });

    test("Tie game projections for advantage win", function () {
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Fourty, GamePoints: 3, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Fourty, GamePoints: 3, Games: 0, Sets: 0 }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Advantage, GamePoints: 4, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Fourty, GamePoints: 3, Games: 0, Sets: 0 }
        }));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Fourty, GamePoints: 4, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Fourty, GamePoints: 4, Games: 0, Sets: 0 }
        }));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Fourty, GamePoints: 4, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Advantage, GamePoints: 5, Games: 0, Sets: 0 }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Fourty, GamePoints: 5, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Fourty, GamePoints: 5, Games: 0, Sets: 0 }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Advantage, GamePoints: 6, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Fourty, GamePoints: 5, Games: 0, Sets: 0 }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 7, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 5, Games: 0, Sets: 0 }
        }));
    });

    test("Tie game projections for single point win", function () {
        var matchDefinition = new m.MatchDefinition(fed, rafa);
        matchDefinition.gameTieMode = m.TieMode.singlePointWin;
        gameEngine = new tsk.Engine(matchDefinition);

        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Fourty, GamePoints: 3, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Fourty, GamePoints: 3, Games: 0, Sets: 0 }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 4, Games: 0, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 3, Games: 0, Sets: 0 }
        }));
    });

}).call(this, this.H.Check, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);