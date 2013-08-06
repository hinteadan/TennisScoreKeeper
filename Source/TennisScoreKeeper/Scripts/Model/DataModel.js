(function (check, undefined) {
    "use strict";

    var gameTieModes = {
            advantageWin: {},
            singlePointWin: {}
        },
        lastSetTieModes = {
            tiebreak: {},
            superTiebreak: {},
            gameDifference: {}
        },
        shotStyles = {
            NormalPassing: new ShotStyle("Normal/Passing"),
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
            }
        };

    function ShotStyle(label) {
        check.notEmpty(label, "label");

        this.label = label;
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
    }

    function Player(name) {
        check.notEmpty(name, "name");
        this.name = name;
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

    function Point(forPlayer, creditedTo, type) {
        /// <param name="forPlayer" type="Player">Player for which the point counts.</param>
        /// <param name="creditedTo" type="Player">Player who gets merit for the point.</param>
        check.notEmpty(forPlayer, "forPlayer");
        check.notEmpty(creditedTo, "creditedTo");
        check.notEmpty(type, "type");
        this.player = forPlayer;
        this.creditedTo = creditedTo;
        this.timestamp = new Date();
        this.type = type;
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
        PointType: PointType
    };

}).call(this.H.TennisScoreKeeper, this.H.Check);