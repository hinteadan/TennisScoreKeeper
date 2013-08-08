(function (check, m, undefined) {
    "use strict";

    function PlayerScoreProjection(player) {
        /// <param name="player" type="m.Player">Player</param>
        check.notEmpty(player, "player");

        this.Player = player;
        this.Game = m.TennisPoints.Love;
        this.Games = 0;
        this.Sets = 0;
    }

    function MatchScoreProjection(playerOneScoreProjection, playerTwoScoreProjection) {
        check.notEmpty(playerOneScoreProjection, "playerOneScoreProjection");
        check.notEmpty(playerTwoScoreProjection, "playerTwoScoreProjection");
        this.PlayerOne = playerOneScoreProjection;
        this.PlayerTwo = playerTwoScoreProjection;
    }

    function ScoreProjector(gameDefinition) {
        /// <param name="gameDefinition" type="m.MatchDefinition">The definition of the tennis match.</param>
        check.notEmpty(gameDefinition, "gameDefinition");


        function projectPointsToTennisScore(points) {
            check.notEmpty(points, "points");
            return new MatchScoreProjection(
                new PlayerScoreProjection(gameDefinition.players[0]),
                new PlayerScoreProjection(gameDefinition.players[1])
                );
        }


        this.toTennisScore = projectPointsToTennisScore;
    }

    this.ScoreProjector = ScoreProjector;

}).call(this.H.TennisScoreKeeper, this.H.Check, this.H.TennisScoreKeeper.Model);