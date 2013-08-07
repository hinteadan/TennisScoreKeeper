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

        function scorePoint(point, opponentPoints) {
            check.notEmpty(point, "point");
            points.push(point);
            processScore(opponentPoints);
        }

        function undoPoint(point, opponentPoints) {
            check.notEmpty(point, "point");
            if (points.length === 0 || points[points.length - 1] !== point) {
                return;
            }

            points.pop();
            processScore(opponentPoints);
        }

        function processScore(opponentPoints) {
            /// <param name="opponentPoints" type="Array" elementType="m.Point"></param>
            if (points.length < scoreMappings.length) {
                self.Score.Game = scoreMappings[points.length];
                return;
            }
            
            if (points.length - opponentPoints.length === 1) {
                self.Score.Game = m.TennisPoints.Advantage;
                return;
            }

            self.Score.Game = m.TennisPoints.Love;
        }

        this.Score = new Score("61f6a346-6248-4cd4-a796-84feb4751129");
        this.Info = player;
        this.Points = points;
        this.scorePoint = scorePoint;
        this.undoPoint = undoPoint;

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
            getScoringPlayer(player).scorePoint(point, getScoringOpponent(player).Points);
        }

        function undoLatestPoint() {
            if (points.length === 0) {
                return;
            }

            var point = points.pop();

            _.each(players, function (p) {
                /// <param name="p" type="ScoringPlayer"></param>
                p.undoPoint(point, getScoringOpponent(p).Points);
            });
        }

        function getScoringPlayer(player) {
            return players[0].Info === player ? players[0] : players[1];
        }

        function getScoringOpponent(player) {
            return players[0].Info === player ? players[1] : players[0];
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