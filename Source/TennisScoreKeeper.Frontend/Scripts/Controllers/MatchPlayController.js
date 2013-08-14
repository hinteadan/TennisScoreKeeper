(function (tsk) {
    "use strict";

    function MatchPlayController(scoreKeeperEngine, $scope) {
        /// <param name="scoreKeeperEngine" type="tsk.Engine" />

        function updateScore() {
            $scope.score = scoreKeeperEngine.tennisScore();
        }

        $scope.updateScore = updateScore;

        updateScore();
    }

    this.controller('MatchPlayController', ['ScoreKeeper', '$scope', MatchPlayController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper);