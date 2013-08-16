(function (tsk, m, angular) {
    "use strict";

    var labels = {
        servingFirstService: 'Serving 1st service',
        servingSecondService: 'Serving 2nd service'
    };

    function MatchPlayController(scoreKeeperEngine, matchDef, $scope) {
        /// <param name="scoreKeeperEngine" type="tsk.Engine" />
        ///<param name="matchDef" type="m.MatchDefinition" />

        function updateScore() {
            $scope.score = scoreKeeperEngine.tennisScore();
        }

        function scorePoint(player, pointType, shotStyle) {
            var pointType = pointType || m.PointTypes.WinningShot,
                shotStyle = shotStyle || m.ShotStyles.NormalPassing;
            scoreKeeperEngine.scorePointFor(player, pointType(shotStyle), $scope.isSecondServe);
            toggleServe(true);
            updateScore();
        }

        function undoLastPoint() {
            scoreKeeperEngine.undoLatestPoint();
            toggleServe(true);
            updateScore();
        }

        function gameScore(player) {
            if (isTiebreak()) {
                return player.GamePoints;
            }
            return player.Game.code;
        }

        function isTiebreak() {
            return $scope.score.PlayerOne.Games === matchDef.gamesPerSet
                && $scope.score.PlayerTwo.Games === matchDef.gamesPerSet;
        }

        function toggleServe(isForceToFirstService) {
            $scope.isSecondServe = isForceToFirstService === true ? false : !$scope.isSecondServe;
            $scope.serveButtonLabel = $scope.isSecondServe ? labels.servingSecondService : labels.servingFirstService;
        }

        function saveMatch() {
            var json = {
                    Metadata: matchDef,
                    Points: scoreKeeperEngine.points
                },
                uriContent = 'data:application/json;filename=match.json,' + encodeURIComponent(angular.toJson(json));
            window.open(uriContent, 'match.json');
        }

        $scope.isSecondServe = false;
        $scope.serveButtonLabel = labels.servingFirstService;
        $scope.toggleServe = toggleServe;
        $scope.updateScore = updateScore;
        $scope.scorePoint = scorePoint;
        $scope.undoLastPoint = undoLastPoint;
        $scope.gameScore = gameScore;
        $scope.pointTypes = m.PointTypes;
        $scope.saveMatch = saveMatch;

        updateScore();
    }

    this.controller('MatchPlayController', ['ScoreKeeper', 'MatchDefinition', '$scope', MatchPlayController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Model, this.angular);