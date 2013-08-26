(function () {
    "use strict";

    function OverallStats() {
        this.restrict = 'E';
        this.replace = true;
        this.templateUrl = 'Views/Templates/OverallStats.html';
        this.scope = {
            stats: '=',
        };
    }

    this.directive('overallStats', [function () {
        return new OverallStats();
    }]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule);