(function (tsk) {
    "use strict";
    
    function StatsController(statsProjector, checkService) {
        /// <param name="statsProjector" type="tsk.MatchStatisticsProjector" />
        
        checkService.isMatchDefined(function () {
            $window.location.href = $window.location.pathname;
        });

    }

    this.controller('StatsController', ['StatsProjector', 'MatchDefinitionCheckService', StatsController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper);