﻿(function (tsk, _, undefined) {
    "use strict";

    var gamePointLabels = ['0', '15', '30', '40', 'Ad'];

    function DetailedScoreController($scope, matchDef, scoreKeeper, scoreProjector, eventService) {
        /// <param name="matchDef" type="tsk.Model.MatchDefinition" />
        /// <param name="scoreKeeper" type="tsk.Engine" />
        /// <param name="scoreProjector" type="tsk.DetailedScoreProjector" />
        /// <param name="eventService" type="tsk.Ui.EventService" />

        var score = scoreProjector.projectScore(scoreKeeper.points),
            setsToWin = Math.ceil(matchDef.setsCount / 2);

        eventService.AddScoreChangedHandler(function (scoreData) {
            var matchDefinition = tsk.Model.Convert.Json(scoreData).ToMatchDefinition(),
                points = tsk.Model.Convert.Json(scoreData).ToPoints(matchDefinition);

            updateScoreDisplay(matchDefinition, points);
            console.log(scoreData);
        });

        function updateScoreDisplay(matchDefinition, points) {
            var engine = new tsk.Engine(matchDefinition, points),
                projector = new tsk.DetailedScoreProjector(matchDefinition);

            setsToWin = Math.ceil(matchDefinition.setsCount / 2);
            $scope.score = score = projector.projectScore(engine.points);
            $scope.$apply();
        }


        function gameScore(game, opponentGame) {
            if (!game) {
                return 0;
            }
            return isTiebreak() 
                ? game.Score() 
                : labelGamePoints(game.Score(), opponentGame ? opponentGame.Score() : 0);
        }

        function labelGamePoints(points, opponentPoints) {
            if (points < gamePointLabels.length - 1 
                && opponentPoints < gamePointLabels.length - 1) {
                return gamePointLabels[points];
            }
            var diff = points - opponentPoints;
            if (diff === 0) {
                return gamePointLabels[3];
            }
            if (diff > 0) {
                return gamePointLabels[4];
            }
            if (diff < 0) {
                return '';
            }
        }

        function isTiebreak() {
            if (score.PlayerOne.Score.Sets.length === 0 || score.PlayerTwo.Score.Sets.length === 0) {
                return false;
            }
            return _.last(score.PlayerOne.Score.Sets).Score() === matchDef.gamesPerSet
                && _.last(score.PlayerTwo.Score.Sets).Score() === matchDef.gamesPerSet;
        }

        function winningPlayer() {
            if (score.PlayerOne.Score.Score() === setsToWin) {
                return score.PlayerOne.Player;
            }

            if (score.PlayerTwo.Score.Score() === setsToWin) {
                return score.PlayerTwo.Player;
            }

            return undefined;
        }

        function labelSet(player, setIndex) {
            var playerScore = score.forPlayer(player);
            if (!playerScore.Score.Sets[setIndex]) {
                return score.forOpponent(player).Score.Sets[setIndex] ? 0 : '';
            }
            return playerScore.Score.Sets[setIndex].Score() + labelSetTiebreak(playerScore.Score.Sets[setIndex]);
        }

        function labelSetTiebreak(set) {
            if (!set.TiebreakGame) {
                return '';
            }

            return '(' + set.TiebreakGame.Score() + ')';
        }

        function isSetWon(player, setIndex) {
            var playerScore = score.forPlayer(player);
            if (!playerScore.Score.Sets[setIndex]) {
                return false;
            }
            return playerScore.Score.Sets[setIndex].IsWon;
        }

        $scope.score = score;
        $scope.winner = winningPlayer;
        $scope.playerOneGameScore = function () {
            return gameScore(_.last(score.PlayerOne.Score.Games), _.last(score.PlayerTwo.Score.Games));
        }
        $scope.playerTwoGameScore = function () {
            return gameScore(_.last(score.PlayerTwo.Score.Games), _.last(score.PlayerOne.Score.Games));
        }

        $scope.labelSet = labelSet;
        $scope.isSetWon = isSetWon;
    }

    this.controller('DetailedScoreController', 
        ['$scope', 'MatchDefinition', 'ScoreKeeper', 'DetailedScoreProjector', 'EventService', DetailedScoreController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper, this._);