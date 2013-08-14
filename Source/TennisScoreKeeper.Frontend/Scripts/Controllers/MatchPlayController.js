(function (tsk, m) {
    "use strict";

    function MatchPlayController(scoreKeeperEngine, matchDef, $scope) {
        /// <param name="scoreKeeperEngine" type="tsk.Engine" />
        ///<param name="matchDef" type="m.MatchDefinition" />

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

        $scope.updateScore = updateScore;
        $scope.scorePoint = scorePoint;
        $scope.undoLastPoint = undoLastPoint;
        $scope.gameScore = gameScore;

        updateScore();
    }

    this.controller('MatchPlayController', ['ScoreKeeper', 'MatchDefinition', '$scope', MatchPlayController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Model);