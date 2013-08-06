(function (check, m) {
    "use strict";

    function GameEngine(gameDefinition) {
        /// <param name="gameDefinition" type="m.MatchDefinition">The definition of the tennis match.</param>
        
        var points = [],
            pointFactory = new PointFactory(gameDefinition.players);

        function construct() {
            check.notEmpty(gameDefinition, "gameDefinition");
        }

        function scorePointFor(player, type) {
            points.push(pointFactory.pointFor(player, type));
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
        this.players = gameDefinition.players;
        this.points = points;
    }

    function PointFactory(players) {
        /// <param name="players" type="Array" elementType="m.Player">The two player in the current match. Should be fetched from the game definition.</param>

        function construct() {
            check.notEmpty(players, "players");
            check.condition(players.length === 2, "The match must have exactly two players");
        }

        function pointFor(player, type) {
            return new m.Point(player, player, type);
        }

        construct();

        this.pointFor = pointFor;
    }

    this.Engine = GameEngine;
    this.PointFactory = PointFactory;

}).call(this.H.TennisScoreKeeper, this.H.Check, this.H.TennisScoreKeeper.Model);