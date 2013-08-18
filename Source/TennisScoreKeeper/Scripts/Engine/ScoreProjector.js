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

    function MatchScoreProjection(playerOneScoreProjection, playerTwoScoreProjection, setsPerMatch, servingPlayer) {
        /// <param name="playerOneScoreProjection" type="PlayerScoreProjection"  />
        /// <param name="playerTwoScoreProjection" type="PlayerScoreProjection"  />
        check.notEmpty(playerOneScoreProjection, "playerOneScoreProjection");
        check.notEmpty(playerTwoScoreProjection, "playerTwoScoreProjection");
        check.notEmpty(setsPerMatch, "setsPerMatch");
        check.notEmpty(servingPlayer, "servingPlayer");

        var self = this,
            setsToWin = Math.ceil(setsPerMatch / 2);

        this.PlayerOne = playerOneScoreProjection;
        this.PlayerTwo = playerTwoScoreProjection;
        this.Winner = function () {
            return playerOneScoreProjection.Sets === setsToWin
                ? playerOneScoreProjection
                : playerTwoScoreProjection.Sets === setsToWin
                ? playerTwoScoreProjection
                : null;
        }
        this.IsWon = function () {
            return self.Winner() !== null;
        }
        this.ServingPlayer = function () {
            return servingPlayer;
        }
    }

    function ScoreProjectorHooks(onGame, onSet, onMatch) {

        var self = this;

        function tryCallHook(hook, argsArray) {
            if (typeof (hook) !== 'function') {
                return;
            }
            hook.apply(undefined, argsArray);
        }

        this.onGameWon = onGame;
        this.onSetWon = onSet,
        this.onMatchWon = onMatch;

        this.raiseOnGameWon = function () { tryCallHook(self.onGameWon, arguments); }
        this.raiseOnSetWon = function () { tryCallHook(self.onSetWon, arguments); }
        this.raiseOnMatchWon = function () { tryCallHook(self.onMatchWon, arguments); }
    }

    function ScoreProjector(gameDefinition, hooks) {
        /// <param name="gameDefinition" type="m.MatchDefinition">The definition of the tennis match.</param>
        /// <param name="hooks" type="ScoreProjectorHooks">
        check.notEmpty(gameDefinition, "gameDefinition");

        var servingPlayer = gameDefinition.startingPlayer,
            firstServingPlayerOnTiebreak = null,
            decidingPoint = null,
            pointsBeingProcessed = [];

        function projectPointsToTennisScore(points) {
            check.notEmpty(points, "points");

            var playerOneScoreProjection = new PlayerScoreProjection(gameDefinition.players[0]),
                playerTwoScoreProjection = new PlayerScoreProjection(gameDefinition.players[1]);

            servingPlayer = gameDefinition.startingPlayer;

            processPoints(points, playerOneScoreProjection, playerTwoScoreProjection);

            var matchProjection = new MatchScoreProjection(
                playerOneScoreProjection,
                playerTwoScoreProjection,
                gameDefinition.setsCount,
                servingPlayer);

            if (matchProjection.IsWon()) {
                hook('raiseOnGameWon', [new HookArgs(playerOneScoreProjection, playerTwoScoreProjection, "22eb1d7990b640aab2c47aa9ba18572f")]);
            }

            return matchProjection;
        }

        function processPoints(points, playerScore, opponentScore) {
            /// <param name="points" type="Array" elementType="m.Point" />
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />
            pointsBeingProcessed = points;
            for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
                var point = points[pointIndex];
                decidingPoint = point;
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

            if (shouldSetBeTieBroke(playerScore, opponentScore)) {
                firstServingPlayerOnTiebreak = servingPlayer;
                if ((playerScore.GamePoints + opponentScore.GamePoints) % 2 !== 0) {
                    toggleServingPlayer();
                }
                if (isTiebreakWon(playerScore, opponentScore)) {
                    servingPlayer = firstServingPlayerOnTiebreak === playerScore.Player
                        ? opponentScore.Player
                        : playerScore.Player;
                    gameWonFor(playerScore, opponentScore);
                    setWonFor(playerScore, opponentScore);
                }
                return;
            }

            if (playerScore.GamePoints <= 3) {
                playerScore.Game = gamePointMapping[playerScore.GamePoints];
                return;
            }

            if (isGameTied(playerScore, opponentScore)) {
                var diff = playerScore.GamePoints - opponentScore.GamePoints;
                playerScore.Game = gameDefinition.gameTieMode.PointByDifference(diff);
                opponentScore.Game = gameDefinition.gameTieMode.PointByDifference(-diff);
                if (diff > 0 && playerScore.Game == m.TennisPoints.Love && opponentScore.Game == m.TennisPoints.Love) {
                    gameWonFor(playerScore, opponentScore);
                }
                return;
            }

            gameWonFor(playerScore, opponentScore);
        }

        function gameWonFor(playerScore, opponentScore) {
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />

            hook('raiseOnGameWon', [new HookArgs(playerScore, opponentScore, "22eb1d7990b640aab2c47aa9ba18572f")]);

            playerScore.Game = m.TennisPoints.Love;
            opponentScore.Game = m.TennisPoints.Love;
            playerScore.GamePoints = 0;
            opponentScore.GamePoints = 0;
            playerScore.Games++;

            toggleServingPlayer();

            if (isSetWon(playerScore, opponentScore)) {
                setWonFor(playerScore, opponentScore);
            }
        }

        function toggleServingPlayer() {
            servingPlayer = servingPlayer === gameDefinition.players[0]
                ? gameDefinition.players[1]
                : gameDefinition.players[0];
        }

        function isSetWon(playerScore, opponentScore) {
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />
            var diff = playerScore.Games - opponentScore.Games;
            return diff >= 2 && playerScore.Games >= gameDefinition.gamesPerSet;
        }

        function isTiebreakWon(playerScore, opponentScore) {
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />
            var diff = playerScore.GamePoints - opponentScore.GamePoints;
            return diff >= 2 && playerScore.GamePoints >=
                tieBreakMinimumPointsToWin(playerScore, opponentScore);
        }

        function tieBreakMinimumPointsToWin(playerScore, opponentScore) {
            if (!isDecidingSet(playerScore, opponentScore)) {
                return 7;
            }

            return gameDefinition.lastSetTieMode.minimumGamePoints;
        }

        function isDecidingSet(playerScore, opponentScore) {
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />
            return playerScore.Sets === opponentScore.Sets
                && playerScore.Sets === Math.floor(gameDefinition.setsCount / 2);
        }

        function setWonFor(playerScore, opponentScore) {
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />

            hook('raiseOnSetWon', [new HookArgs(playerScore, opponentScore, "22eb1d7990b640aab2c47aa9ba18572f")]);

            playerScore.Games = 0;
            opponentScore.Games = 0;
            playerScore.Sets++;
        }

        function isGameTied(playerScore, opponentScore) {
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />
            return check.value(playerScore.GamePoints - opponentScore.GamePoints)
                .isBetweenInclusive(-1, 1);
        }

        function shouldSetBeTieBroke(playerScore, opponentScore) {
            /// <param name="playerScore" type="PlayerScoreProjection"  />
            /// <param name="opponentScore" type="PlayerScoreProjection"  />
            var shouldTieBreakByScore = playerScore.Games === gameDefinition.gamesPerSet
                && opponentScore.Games === gameDefinition.gamesPerSet;

            if (!isDecidingSet(playerScore, opponentScore)) {
                return shouldTieBreakByScore;
            }

            return shouldTieBreakByScore &&
                gameDefinition.lastSetTieMode !== m.LastSetTieMode.gameDifference;
        }

        function hook(hookName, args) {
            if (!hooks) {
                return;
            }
            hookCall[hookName].apply(undefined, args);
        }

        function HookArgs(playerScore, opponentScore) {
            check.condition(arguments[2] === "22eb1d7990b640aab2c47aa9ba18572f",
                "HookArgs must not be instantiated. They are exposed for intellisense");

            this.WinningPlayer = playerScore.Player;
            this.WinningGamePoints = playerScore.GamePoints;
            this.LosingPlayer = opponentScore.Player;
            this.LosingGamePoints = opponentScore.GamePoints;
            this.ServingPlayer = servingPlayer;
            this.IsTiebreak = shouldSetBeTieBroke(playerScore, opponentScore);
            this.DecidingPoint = decidingPoint;
            this.AllPoints = pointsBeingProcessed;
        }

        this.toTennisScore = projectPointsToTennisScore;
        this.HookArgs = HookArgs;
    }

    this.ScoreProjector = ScoreProjector;
    this.ScoreProjectorHooks = ScoreProjectorHooks;

}).call(this.H.TennisScoreKeeper, this.H.Check, this.H.TennisScoreKeeper.Model);