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
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 1, Sets: 0 },
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
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 1, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
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
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 1, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));

        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Fourty, GamePoints: 3, Games: 1, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Fourty, GamePoints: 3, Games: 0, Sets: 0 }
        }));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 1, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 1, Sets: 0 }
        }));
    });

    test("Games count", function () {
        winOnePerfectGameFor(fed);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 1, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
        winOnePerfectGameFor(fed);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 2, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
        winOnePerfectGameFor(rafa);
        winOnePerfectGameFor(rafa);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 2, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 2, Sets: 0 }
        }));
        winOnePerfectGameFor(fed);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 3, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 2, Sets: 0 }
        }));
    });

    test("Simple Sets count", function () {
        winOnePerfectSetFor(fed, 6);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
        winOnePerfectSetFor(fed, 6);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 2 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
        winOnePerfectSetFor(rafa, 6);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 2 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 }
        }));
    });

    test("Simple Sets count for variable games per set", function () {

        var matchDefinition = new m.MatchDefinition(fed, rafa);
        matchDefinition.gamesPerSet = 3;
        gameEngine = new tsk.Engine(matchDefinition);

        winOnePerfectSetFor(fed, matchDefinition.gamesPerSet);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
        winOnePerfectSetFor(rafa, matchDefinition.gamesPerSet);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 }
        }));
        winOnePerfectSetFor(fed, matchDefinition.gamesPerSet);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 2 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 }
        }));
    });

    test("Set win on 7-5", function () {
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
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 6, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 5, Sets: 0 }
        }));
        winOnePerfectGameFor(fed);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
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
        winOnePerfectGameFor(rafa);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 5, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 6, Sets: 0 }
        }));
        winOnePerfectGameFor(rafa);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 }
        }));
    });

    test("Set win on tiebreak", function () {
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
        winOnePerfectGameFor(rafa);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 6, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 6, Sets: 0 }
        }));

        //Tiebreak start
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
    });

    test("Set win on tiebreak with tiebreak tied", function () {
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
        winOnePerfectGameFor(rafa);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 6, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 6, Sets: 0 }
        }));

        //Tiebreak start
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));

        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 6, Games: 6, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 6, Games: 6, Sets: 0 }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 7, Games: 6, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 6, Games: 6, Sets: 0 }
        }));
        gameEngine.scorePointFor(rafa, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 7, Games: 6, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 7, Games: 6, Sets: 0 }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 8, Games: 6, Sets: 0 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 7, Games: 6, Sets: 0 }
        }));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
    });

    test("Deciding set win with tiebreak", function () {
        winOnePerfectSetFor(fed, 6);
        winOnePerfectSetFor(rafa, 6);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 }
        }));
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
        winOnePerfectGameFor(rafa);

        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 6, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 6, Sets: 1 }
        }));

        //Tiebreak start
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));

        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 2 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 }
        }));
    });

    test("Deciding set win with supertiebreak", function () {
        var matchDefinition = new m.MatchDefinition(fed, rafa);
        matchDefinition.lastSetTieMode = m.LastSetTieMode.superTiebreak;
        gameEngine = new tsk.Engine(matchDefinition);

        winOnePerfectSetFor(fed, 6);
        winOnePerfectSetFor(rafa, 6);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 }
        }));
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
        winOnePerfectGameFor(rafa);

        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 6, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 6, Sets: 1 }
        }));

        //Tiebreak start
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
        gameEngine.scorePointFor(fed, m.PointTypes.Ace(m.ShotStyles.NormalPassing));

        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 2 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 }
        }));
    });

    test("Deciding set win with game difference", function () {
        var matchDefinition = new m.MatchDefinition(fed, rafa);
        matchDefinition.lastSetTieMode = m.LastSetTieMode.gameDifference;
        gameEngine = new tsk.Engine(matchDefinition);

        winOnePerfectSetFor(fed, 6);
        winOnePerfectSetFor(rafa, 6);
        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 }
        }));
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
        winOnePerfectGameFor(rafa);

        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 6, Sets: 1 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 6, Sets: 1 }
        }));

        winOnePerfectGameFor(fed);
        winOnePerfectGameFor(fed);

        ok(check.areSame(gameEngine.tennisScore(), {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 2 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 1 }
        }));
    });

    test("Match is won", function () {
        winOnePerfectSetFor(fed, 6);
        winOnePerfectSetFor(fed, 6);
        var match = gameEngine.tennisScore();
        ok(check.areSame(match, {
            PlayerOne: { Player: fed, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 2 },
            PlayerTwo: { Player: rafa, Game: m.TennisPoints.Love, GamePoints: 0, Games: 0, Sets: 0 }
        }));
        ok(match.IsWon());
        ok(match.Winner().Player === fed);
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