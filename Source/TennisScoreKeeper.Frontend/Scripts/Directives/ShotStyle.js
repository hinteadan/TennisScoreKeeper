(function () {
    "use strict";

    function ShotStyle() {
        this.restrict = 'E';
        this.replace = true;
        this.templateUrl = 'Views/Templates/ShotStyle.html';
    }

    this.directive('shotStyle', [function () {
        return new ShotStyle();
    }]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule);