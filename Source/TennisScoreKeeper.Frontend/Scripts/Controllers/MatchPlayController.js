(function (tsk, m, angular) {
    "use strict";

    var labels = {
        servingFirstService: 'Serving 1st service',
        servingSecondService: 'Serving 2nd service'
    };

    function MatchPlayController(scoreKeeperEngine, matchDef, $scope, $location, $routeParams, $window, dataService, checkService) {
        /// <param name="scoreKeeperEngine" type="tsk.Engine" />
        /// <param name="matchDef" type="m.MatchDefinition" />

        checkService.isMatchDefined(function () {
            $window.location.href = $window.location.pathname;
        });

        var currentMatchId = $routeParams.id;

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
                matchInfo;

            if (!currentMatchId) {
                matchInfo = dataService.SaveMatch(json, function () {
                    currentMatchId = matchInfo.Id;
                });
            }
            else {
                dataService.UpdateMatch({ id: currentMatchId }, json);
            }

            //window.open(uriContent, 'match.json');
        }

        function viewDetailedScore() {
            $location.path('/Score');
        }

        function viewStats() {
            $location.path('/Stats');
        }

        function newMatch() {
            if (!confirm('Are you sure you want to start a new match ? Any unsaved data will be lost')) {
                return;
            }
            $window.location.href = $window.location.pathname;
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
        $scope.viewDetailedScore = viewDetailedScore;
        $scope.viewStats = viewStats;
        $scope.newMatch = newMatch;

        updateScore();
    }

    this.controller('MatchPlayController',
        ['ScoreKeeper', 'MatchDefinition', '$scope', '$location', '$routeParams', '$window', 'DataService', 'MatchDefinitionCheckService',
            MatchPlayController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Model, this.angular);