(function (tsk, m) {
    "use strict";

    function MatchPlayController(scoreKeeperEngine, $scope) {
        /// <param name="scoreKeeperEngine" type="tsk.Engine" />

        function updateScore() {
            $scope.score = scoreKeeperEngine.tennisScore();
        }

        function scorePoint(player) {
            scoreKeeperEngine.scorePointFor(player, m.PointTypes.Ace(m.ShotStyles.NormalPassing));
            updateScore();
        }

        function undoLastPoint() {
            scoreKeeperEngine.undoLatestPoint();
            updateScore();
        }

        $scope.updateScore = updateScore;
        $scope.scorePoint = scorePoint;
        $scope.undoLastPoint = undoLastPoint;

        updateScore();
    }

    this.controller('MatchPlayController', ['ScoreKeeper', '$scope', MatchPlayController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Model);