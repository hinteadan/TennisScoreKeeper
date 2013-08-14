(function (tsk, check) {
    "use strict";

    var app = this;

    function NewMatchController(matchDefinition, $scope, $location) {
        ///<param name="matchDefinition" type="tsk.Model.MatchDefinition" />

        function startMatch() {

            var a = matchDefinition;
            var b = '';

            //$location.path('/Play');
        }

        function setStartingPlayer(index) {
            check.condition(check.value(index).isBetweenInclusive(0, 1), 'Index must be [0,1]');
            matchDefinition.startingPlayer = matchDefinition.players[index];
        }

        $scope.setStartingPlayer = setStartingPlayer;
        $scope.firstToServe = 0;
        $scope.Match = matchDefinition;
        $scope.play = startMatch;
    }

    this.controller('NewMatchController', ['MatchDefinition', '$scope', '$location', NewMatchController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper, this.H.Check);