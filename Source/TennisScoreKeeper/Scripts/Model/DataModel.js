(function (check, S, undefined) {
    "use strict";

    var tennisPoints = {
            Love: { id: 'Love', code: '0' },
            Fifteen: { id: 'Fifteen', code: '15' },
            Thirty: { id: 'Thirty', code: '30' },
            Fourty: { id: 'Fourty', code: '40' },
            Advantage: { id: 'Advantage', code: 'Ad' }
        },
        gameTieModes = {
            advantageWin: new GameTieMode('AdvantageWin', advantageWinPointFunc, "15b6d1fc81a043c081242617308b4fdc"),
            singlePointWin: new GameTieMode('SinglePointWin', singlePointWinFunc, "15b6d1fc81a043c081242617308b4fdc")
        },
        lastSetTieModes = {
            tiebreak: { id: 'TieBreak', minimumGamePoints: 7 },
            superTiebreak: { id: 'SuperTieBreak', minimumGamePoints: 10 },
            gameDifference: { id: 'GameDifference', minimumGamePoints: 4 }
        },
        shotStyles = {
            NormalPassing: new ShotStyle("Normal/Passing"),
            Volley: new ShotStyle("Volley"),
            Smash: new ShotStyle("Smash"),
            Lob: new ShotStyle("Lob"),
            Drop: new ShotStyle("Drop")
        },
        pointCreditTypes = {
            PointWinner: 0,
            PointLoser: 1
        },
        pointTypes = {
            WinningShot: function (shotStyle) {
                return new PointType(
                    pointCreditTypes.PointWinner,
                    "Winning Shot",
                    shotStyle, 
                    "82ee546ae51f4a77a048186fa13e98f1");
            },
            ForcedError: function (shotStyle) {
                return new PointType(
                    pointCreditTypes.PointWinner,
                    "Forced Error",
                    shotStyle,
                    "82ee546ae51f4a77a048186fa13e98f1");
            },
            UnforcedError: function (shotStyle) {
                return new PointType(
                    pointCreditTypes.PointLoser,
                    "Unforced Error",
                    shotStyle,
                    "82ee546ae51f4a77a048186fa13e98f1");
            },
            Ace: function (shotStyle) {
                return new PointType(
                    pointCreditTypes.PointWinner,
                    "Ace",
                    shotStyle,
                    "82ee546ae51f4a77a048186fa13e98f1");
            },
            DoubleFault: function (shotStyle) {
                return new PointType(
                    pointCreditTypes.PointLoser,
                    "Double Fault",
                    shotStyle,
                    "82ee546ae51f4a77a048186fa13e98f1");
            }
        };

    function GameTieMode(id, pointByDifferenceFunc) {
        check.condition(arguments[2] === "15b6d1fc81a043c081242617308b4fdc",
            "GameTieMode must not be instantiated. Use TieMode enum.");
        check.notEmpty(id, "id");
        check.notEmpty(pointByDifferenceFunc, "pointByDifferenceFunc");
        check.condition(typeof(pointByDifferenceFunc) === 'function', 
            "pointByDifferenceFunc must be a function returning tennisPoint via point difference");

        this.PointByDifference = function (difference) {
            return pointByDifferenceFunc.call(null, difference);
        }

        this.id = id;
    }

    function advantageWinPointFunc(difference) {
        check.condition(check.value(difference).isBetweenInclusive(-1, 1),
            "Something is wrong, point difference must be [-1,1]");

        if (check.value(difference).isBetweenInclusive(-1, 0)) {
            return tennisPoints.Fourty;
        }

        if (difference === 1) {
            return tennisPoints.Advantage;
        }

        return tennisPoints.Love;
    }

    function singlePointWinFunc(difference) {
        check.condition(check.value(difference).isBetweenInclusive(-1, 1),
            "Something is wrong, point difference must be [-1,1]");

        if (difference === 0) {
            return tennisPoints.Fourty;
        }

        return tennisPoints.Love;
    }

    function ShotStyle(label) {
        check.notEmpty(label, "label");

        this.label = label;
        this.id = generateId(label);
    }

    function PointType(pointCreditType, label, shotStyle) {
        check.condition(arguments[3] === "82ee546ae51f4a77a048186fa13e98f1",
            "PointType must not be instantiated. Use PointTypes enum.");
        check.notEmpty(label, "label");
        check.notEmpty(shotStyle, "shotStyle");
        check.condition(
            pointCreditType === pointCreditTypes.PointWinner
            || pointCreditType === pointCreditTypes.PointLoser,
            "Point credit goes to winner or loser. Use pointCreditTypes enum");

        this.label = label;
        this.creditTo = pointCreditType;
        this.shotStyle = shotStyle;
        this.id = generateId(label);
    }

    function Player(name) {
        check.notEmpty(name, "name");
        var self = this;
        this.name = name;
        this.id = generateId(name);
        this.setName = function(newName){
            self.name = newName;
            self.id = generateId(newName);
        }
    }

    function MatchDefinition(playerOne, playerTwo, isPlayerTwoFirstToServe) {
        check.notEmpty(playerOne, "playerOne");
        check.notEmpty(playerTwo, "playerTwo");

        this.players = [
            playerOne,
            playerTwo
        ];
        this.gamesPerSet = 6;
        this.setsCount = 3;
        this.gameTieMode = gameTieModes.advantageWin;
        this.lastSetTieMode = lastSetTieModes.tiebreak;
        this.startingPlayer = isPlayerTwoFirstToServe ? playerTwo : playerOne;
    }

    function Point(forPlayer, creditedTo, type, isOnSecondServe) {
        /// <param name="forPlayer" type="Player">Player for which the point counts.</param>
        /// <param name="creditedTo" type="Player">Player who gets merit for the point.</param>
        check.notEmpty(forPlayer, "forPlayer");
        check.notEmpty(creditedTo, "creditedTo");
        check.notEmpty(type, "type");
        this.player = forPlayer;
        this.creditedTo = creditedTo;
        this.timestamp = new Date();
        this.type = type;
        this.isOnSecondServe = isOnSecondServe;
    }

    function generateId(fromString) {
        return S(fromString)
            .trim()
            .replaceAll(' ', '')
            .replaceAll('/', '')
            .s;
    }

    this.Model = {
        Player: Player,
        MatchDefinition: MatchDefinition,
        TieMode: gameTieModes,
        LastSetTieMode: lastSetTieModes,
        Point: Point,
        ShotStyles: shotStyles,
        PointCreditTypes: pointCreditTypes,
        PointTypes: pointTypes,
        PointType: PointType,
        TennisPoints: tennisPoints
    };

}).call(this.H.TennisScoreKeeper, this.H.Check, this.S);