(function (tsk) {
    "use strict";
    
    function StatsController($scope, $location, score, statsProjector, checkService) {
        /// <param name="statsProjector" type="tsk.MatchStatisticsProjector" />
        /// <param name="score" type="tsk.Engine" />
        
        checkService.isMatchDefined(function () {
            //$window.location.href = $window.location.pathname;
        });

        $scope.stats = statsProjector.project(score.points);
        $scope.viewPlayDashboard = function () {
            $location.path('/Play');
        }
    }

    this.controller('StatsController',
        ['$scope', '$location', 'ScoreKeeper', 'StatsProjector', 'MatchDefinitionCheckService', StatsController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper);