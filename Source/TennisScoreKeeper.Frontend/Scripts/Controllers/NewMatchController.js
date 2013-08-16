(function (tsk, m, check) {
    "use strict";

    var app = this;

    function NewMatchController(matchDefinition, $scope, $location) {
        ///<param name="matchDefinition" type="tsk.Model.MatchDefinition" />

        var gameTieModes = {
                AdvantageWin: new GameTieMode('Advantage Win', m.TieMode.advantageWin),
                SinglePointWin: new GameTieMode('Single Point Win', m.TieMode.singlePointWin)
            };

        function GameTieMode(label, tskMode){
            var self = this;
            this.Label = label;
            this.Mode = tskMode;
            this.Toggle = function(){
                toggleTieMode(self);
            }
        }

        function startMatch() {
            $location.path('/Play');
        }

        function setStartingPlayer(index) {
            check.condition(check.value(index).isBetweenInclusive(0, 1), 'Index must be [0,1]');
            matchDefinition.startingPlayer = matchDefinition.players[index];
        }

        function toggleTieMode(mode) {
            matchDefinition.gameTieMode = mode.Mode;
            $scope.selectedTieMode = mode;
        }

        $scope.setStartingPlayer = setStartingPlayer;
        $scope.firstToServe = 0;
        $scope.Match = matchDefinition;
        $scope.tieModes = gameTieModes;
        $scope.selectedTieMode = gameTieModes.AdvantageWin;
        $scope.play = startMatch;
    }

    this.controller('NewMatchController', ['MatchDefinition', '$scope', '$location', NewMatchController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule,
    this.H.TennisScoreKeeper,
    this.H.TennisScoreKeeper.Model,
    this.H.Check);