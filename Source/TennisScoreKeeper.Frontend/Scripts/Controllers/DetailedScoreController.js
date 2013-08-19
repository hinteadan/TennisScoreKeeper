(function (tsk, _, undefined) {
    "use strict";

    var gamePointLabels = ['0', '15', '30', '40', 'Ad'];

    function DetailedScoreController($scope, $location, matchDef, scoreKeeper, scoreProjector) {
        /// <param name="matchDef" type="tsk.Model.MatchDefinition" />
        /// <param name="scoreKeeper" type="tsk.Engine" />
        /// <param name="scoreProjector" type="tsk.DetailedScoreProjector" />

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
            if ($scope.score.PlayerOne.Score.Sets.length === 0) {
                return false;
            }
            return _.last($scope.score.PlayerOne.Score.Sets).Score() === matchDef.gamesPerSet
                && _.last($scope.score.PlayerTwo.Score.Sets).Score() === matchDef.gamesPerSet;
        }

        $scope.score = scoreProjector.projectScore(scoreKeeper.points);
        $scope.playerOneGameScore = function () {
            return gameScore(_.last($scope.score.PlayerOne.Score.Games), _.last($scope.score.PlayerTwo.Score.Games));
        }
        $scope.playerTwoGameScore = function () {
            return gameScore(_.last($scope.score.PlayerTwo.Score.Games), _.last($scope.score.PlayerOne.Score.Games));
        }
        $scope.viewPlayDashboard = function () {
            $location.path('/Play');
        }
    }

    this.controller('DetailedScoreController', 
        ['$scope', '$location', 'MatchDefinition', 'ScoreKeeper', 'DetailedScoreProjector', DetailedScoreController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper, this._);