(function (check, m, _) {
    "use strict";

    var tsk = this;

    function GameEngine(gameDefinition) {
        /// <param name="gameDefinition" type="m.MatchDefinition">The definition of the tennis match.</param>
        check.notEmpty(gameDefinition, "gameDefinition");

        var points = [],
            pointFactory = new PointFactory(gameDefinition.players),
            players = [],
            scoreProjector = new tsk.ScoreProjector(gameDefinition),
            servingPlayer = gameDefinition.startingPlayer;

        function construct() {
            players = [
                gameDefinition.players[0],
                gameDefinition.players[1]
            ];
        }

        function scorePointFor(player, type) {
            var point = pointFactory.pointFor(player, type);
            points.push(point);
        }

        function undoLatestPoint() {
            if (points.length === 0) {
                return;
            }
            points.pop();
        }

        construct();

        this.scorePointFor = scorePointFor;
        this.undoLatestPoint = undoLatestPoint;
        this.players = players;
        this.points = points;
        this.tennisScore = function () { return scoreProjector.toTennisScore(points); }
        this.ServingPlayer = function(){ return servingPlayer; };
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