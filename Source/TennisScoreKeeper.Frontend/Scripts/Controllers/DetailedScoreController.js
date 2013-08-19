(function (tsk, _) {
    "use strict";

    function DetailedScoreController($scope, $location, scoreKeeper, scoreProjector) {
        /// <param name="scoreKeeper" type="tsk.Engine" />
        /// <param name="scoreProjector" type="tsk.DetailedScoreProjector" />
        
        $scope.score = scoreProjector.projectScore(scoreKeeper.points);
        $scope.viewPlayDashboard = function () {
            $location.path('/Play');
        }
    }

    this.controller('DetailedScoreController', 
        ['$scope', '$location', 'ScoreKeeper', 'DetailedScoreProjector', DetailedScoreController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper, this._);