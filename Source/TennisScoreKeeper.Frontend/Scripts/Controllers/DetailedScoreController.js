(function (tsk, _, undefined) {
    "use strict";

    var gamePointLabels = ['0', '15', '30', '40', 'Ad'];

    function DetailedScoreController($scope, $location, matchDef, scoreKeeper, scoreProjector) {
        /// <param name="matchDef" type="tsk.Model.MatchDefinition" />
        /// <param name="scoreKeeper" type="tsk.Engine" />
        /// <param name="scoreProjector" type="tsk.DetailedScoreProjector" />

        var score = scoreProjector.projectScore(scoreKeeper.points),
            setsToWin = Math.ceil(matchDef.setsCount / 2);

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
            if (score.PlayerOne.Score.Sets.length === 0) {
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
            return playerScore.Score.Sets[setIndex].Score();
        }

        $scope.score = score;
        $scope.winner = winningPlayer;
        $scope.playerOneGameScore = function () {
            return gameScore(_.last(score.PlayerOne.Score.Games), _.last(score.PlayerTwo.Score.Games));
        }
        $scope.playerTwoGameScore = function () {
            return gameScore(_.last(score.PlayerTwo.Score.Games), _.last(score.PlayerOne.Score.Games));
        }
        $scope.viewPlayDashboard = function () {
            $location.path('/Play');
        }
        $scope.labelSet = labelSet;
    }

    this.controller('DetailedScoreController', 
        ['$scope', '$location', 'MatchDefinition', 'ScoreKeeper', 'DetailedScoreProjector', DetailedScoreController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper, this._);