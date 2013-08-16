(function (m) {
    "use strict";

    function ShotStyle() {
        this.restrict = 'E';
        this.replace = true;
        this.templateUrl = 'Views/Templates/ShotStyle.html';
        this.scope = {
            scorePoint: '=',
            player: '=',
            pointType: '='
        };
        this.controller = ['$scope', function ($scope) {
            $scope.shotStyles = m.ShotStyles;
        }];
    }

    this.directive('shotStyle', [function () {
        return new ShotStyle();
    }]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper.Model);