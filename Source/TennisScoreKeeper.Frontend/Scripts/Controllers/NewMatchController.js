(function (tsk, m, check, _) {
    "use strict";

    var app = this;

    function NewMatchController(matchDefinition, $scope, $location) {
        ///<param name="matchDefinition" type="tsk.Model.MatchDefinition" />

        var gameTieModes = {
                AdvantageWin: new TieMode('Advantage Win', m.TieMode.advantageWin, toggleTieMode),
                SinglePointWin: new TieMode('Single Point Win', m.TieMode.singlePointWin, toggleTieMode)
            },
            lastSetTieModes = {
                TieBreak: new TieMode('Tie Break', m.LastSetTieMode.tiebreak, toggleLastSetTieMode),
                SuperTieBreak: new TieMode('Super Tie Break', m.LastSetTieMode.superTiebreak, toggleLastSetTieMode),
                GameDifference: new TieMode('Game Difference', m.LastSetTieMode.gameDifference, toggleLastSetTieMode)
            };

        function TieMode(label, tskMode, toggleCallback){
            var self = this;
            this.Label = label;
            this.Mode = tskMode;
            this.Toggle = function(){
                toggleCallback.call(self, self);
            }
        }

        function startMatch() {
            _.each(matchDefinition.players, function (p) {
                ///<param name="p" type="m.Player" />
                p.setName(p.name);
            });
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

        function toggleLastSetTieMode(mode) {
            matchDefinition.lastSetTieMode = mode.Mode;
            $scope.selectedLastSetTieMode = mode;
        }

        $scope.setStartingPlayer = setStartingPlayer;
        $scope.firstToServe = 0;
        $scope.Match = matchDefinition;
        $scope.tieModes = gameTieModes;
        $scope.selectedTieMode = gameTieModes.AdvantageWin;
        $scope.lastSetTieModes = lastSetTieModes;
        $scope.selectedLastSetTieMode = lastSetTieModes.TieBreak;
        $scope.play = startMatch;
    }

    this.controller('NewMatchController', ['MatchDefinition', '$scope', '$location', NewMatchController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule,
    this.H.TennisScoreKeeper,
    this.H.TennisScoreKeeper.Model,
    this.H.Check,
    this._);