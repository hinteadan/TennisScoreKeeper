(function (check, m, undefined) {
    "use strict";

    function PlayerScoreProjection(player) {
        /// <param name="player" type="m.Player">Player</param>
        check.notEmpty(player, "player");

        this.Player = player;
        this.Game = m.TennisPoints.Love;
        this.GamePoints = 0;
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

            var playerOneScoreProjection = new PlayerScoreProjection(gameDefinition.players[0]),
                playerTwoScoreProjection = new PlayerScoreProjection(gameDefinition.players[1]);

            return new MatchScoreProjection(
                processPlayerScore(points, playerOneScoreProjection, playerTwoScoreProjection),
                processPlayerScore(points, playerTwoScoreProjection, playerOneScoreProjection)
                );
        }

        function processPlayerScore(points, playerScore, opponentScore) {
            /// <param name="points" type="Array" elementType="m.Point" />
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />
            for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
                var point = points[pointIndex];
                if (point.player !== playerScore.Player) {
                    continue;
                }

                addGamePoint(playerScore, opponentScore);
            }

            return playerScore;
        }

        function addGamePoint(playerScore, opponentScore){
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />

            playerScore.GamePoints++;

            if (isGameTied(playerScore, opponentScore)) {
                playerScore.Game = gameDefinition.gameTieMode.PointByDifference(
                    playerScore.GamePoints - opponentScore.GamePoints
                    );
                return;
            }

            switch (playerScore.Game) {
                case m.TennisPoints.Love: playerScore.Game = m.TennisPoints.Fifteen; break;
                case m.TennisPoints.Fifteen: playerScore.Game = m.TennisPoints.Thirty; break;
                case m.TennisPoints.Thirty: playerScore.Game = m.TennisPoints.Fourty; break;
                case m.TennisPoints.Fourty: playerScore.Game = m.TennisPoints.Love; break;
            }
        }

        function isGameTied(playerScore, opponentScore) {
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />
            return (playerScore.Game === m.TennisPoints.Fourty
                && opponentScore.Game === m.TennisPoints.Fourty)
                || playerScore.Game === m.TennisPoints.Advantage
                || opponentScore.Game === m.TennisPoints.Advantage;

        }

        this.toTennisScore = projectPointsToTennisScore;
    }

    this.ScoreProjector = ScoreProjector;

}).call(this.H.TennisScoreKeeper, this.H.Check, this.H.TennisScoreKeeper.Model);