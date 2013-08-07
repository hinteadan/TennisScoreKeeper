(function (check, m, _) {
    "use strict";

    var scoreMappings = [
        m.TennisPoints.Love,
        m.TennisPoints.Fifteen,
        m.TennisPoints.Thirty,
        m.TennisPoints.Fourty
    ];

    function Score() {
        check.condition(arguments[0] === "61f6a346-6248-4cd4-a796-84feb4751129",
            "Score must not be instantiated. It is created by the GameEngine.");

        this.Game = m.TennisPoints.Love;
        this.Games = 0;
    }

    function ScoringPlayer(player) {
        /// <param name="player" type="m.Player">The player</param>
        check.condition(arguments[1] === "bd1c4b62-e682-4984-985f-9d701913e2f8",
            "ScoringPlayer must not be instantiated. It is created by the GameEngine.");
        check.notEmpty(player, "player");

        var self = this,
            points = [];

        function construct() {
            for (var property in player) {
                self[property] = player[property];
            }
        }

        function scorePoint(point) {
            check.notEmpty(point, "point");
            points.push(point);
            self.GamePoints.push(point);
        }

        function winGame() {
            self.GamePoints = [];
            self.Score.Games++;
        }

        function undoPoint(point) {
            check.notEmpty(point, "point");
            if (points.length === 0 || points[points.length - 1] !== point) {
                return;
            }

            points.pop();

            if (self.GamePoints.length > 0 && self.GamePoints[gamePoints.length - 1] === point) {
                self.GamePoints.pop();
            }
        }

        this.Score = new Score("61f6a346-6248-4cd4-a796-84feb4751129");
        this.Info = player;
        this.Points = points;
        this.GamePoints = [];
        this.scorePoint = scorePoint;
        this.undoPoint = undoPoint;
        this.winGame = winGame;

        construct();
    }

    function GameEngine(gameDefinition) {
        /// <param name="gameDefinition" type="m.MatchDefinition">The definition of the tennis match.</param>
        
        var points = [],
            pointFactory = new PointFactory(gameDefinition.players),
            players = [];

        function construct() {
            check.notEmpty(gameDefinition, "gameDefinition");
            players = [
                new ScoringPlayer(gameDefinition.players[0], "bd1c4b62-e682-4984-985f-9d701913e2f8"),
                new ScoringPlayer(gameDefinition.players[1], "bd1c4b62-e682-4984-985f-9d701913e2f8")
            ];
        }

        function scorePointFor(player, type) {
            var point = pointFactory.pointFor(player, type);
            points.push(point);
            getScoringPlayer(player).scorePoint(point);
            processScore();
        }

        function undoLatestPoint() {
            if (points.length === 0) {
                return;
            }

            var point = points.pop();

            _.each(players, function (p) {
                /// <param name="p" type="ScoringPlayer"></param>
                p.undoPoint(point);
            });

            processScore();
        }

        function getScoringPlayer(player) {
            return players[0].Info === player ? players[0] : players[1];
        }

        function getScoringOpponent(player) {
            return players[0].Info === player ? players[1] : players[0];
        }

        function processScore() {
            processPlayerScore(players[0], players[1]);
            processPlayerScore(players[1], players[0]);
        }

        function processPlayerScore(player, opponent) {
            /// <param name="player" type="ScoringPlayer"></param>
            /// <param name="opponent" type="ScoringPlayer"></param>
            if (player.GamePoints.length < scoreMappings.length) {
                player.Score.Game = scoreMappings[player.GamePoints.length];
                return;
            }

            var tennisPoint = gameDefinition.gameTieMode.PointByDifference(
                player.GamePoints.length - opponent.GamePoints.length
                );

            player.Score.Game = tennisPoint;

            if (tennisPoint === m.TennisPoints.Love) {
                player.winGame();
            }
        }

        construct();

        this.scorePointFor = scorePointFor;
        this.undoLatestPoint = undoLatestPoint;
        this.players = players;
        this.points = points;
    }

    function PointFactory(players) {
        /// <param name="players" type="Array" elementType="m.Player">The two player in the current match. Should be fetched from the game definition.</param>

        function construct() {
            check.notEmpty(players, "players");
            check.condition(players.length === 2, "The match must have exactly two players");
        }

        function pointFor(player, type) {
            /// <param name="player" type="m.Player">Player for which the points counts.</param>
            /// <param name="type" type="m.PointType">Point Type</param>
            var losingPlayer = player === players[0] ?  players[1] : players[0];
            return new m.Point(
                player,
                type.creditTo === m.PointCreditTypes.PointWinner ? player : losingPlayer,
                type);
        }

        construct();

        this.pointFor = pointFor;
    }

    this.Engine = GameEngine;
    this.PointFactory = PointFactory;

}).call(this.H.TennisScoreKeeper, this.H.Check, this.H.TennisScoreKeeper.Model, this._);