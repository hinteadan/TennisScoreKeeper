(function (check, m, undefined) {
    "use strict";

    var gamePointMapping = [
        m.TennisPoints.Love,
        m.TennisPoints.Fifteen,
        m.TennisPoints.Thirty,
        m.TennisPoints.Fourty
    ];

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

            processPoints(points, playerOneScoreProjection, playerTwoScoreProjection);

            return new MatchScoreProjection(playerOneScoreProjection, playerTwoScoreProjection);
        }

        function processPoints(points, playerScore, opponentScore) {
            /// <param name="points" type="Array" elementType="m.Point" />
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />
            for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
                var point = points[pointIndex];
                if (point.player === playerScore.Player) {
                    addGamePoint(playerScore, opponentScore);
                }
                else {
                    addGamePoint(opponentScore, playerScore);
                }
            }
        }

        function addGamePoint(playerScore, opponentScore){
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />

            playerScore.GamePoints++;

            if (playerScore.GamePoints <= 3) {
                playerScore.Game = gamePointMapping[playerScore.GamePoints];
                return;
            }

            if (isGameTied(playerScore, opponentScore)) {
                playerScore.Game = gameDefinition.gameTieMode.PointByDifference(
                    playerScore.GamePoints - opponentScore.GamePoints
                    );
                opponentScore.Game = gameDefinition.gameTieMode.PointByDifference(
                    opponentScore.GamePoints - playerScore.GamePoints
                    );
                return;
            }

            playerScore.Game = m.TennisPoints.Love;
            opponentScore.Game = m.TennisPoints.Love;
        }

        function isGameTied(playerScore, opponentScore) {
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />
            return check.value(playerScore.GamePoints - opponentScore.GamePoints)
                .isBetweenInclusive(-1, 1);
        }

        this.toTennisScore = projectPointsToTennisScore;
    }

    this.ScoreProjector = ScoreProjector;

}).call(this.H.TennisScoreKeeper, this.H.Check, this.H.TennisScoreKeeper.Model);