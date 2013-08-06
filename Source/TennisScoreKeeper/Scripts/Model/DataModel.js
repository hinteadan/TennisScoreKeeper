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
        };

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
        Point: Point
    };

}).call(this.H.TennisScoreKeeper, this.H.Check);