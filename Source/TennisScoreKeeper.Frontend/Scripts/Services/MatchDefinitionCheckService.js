(function (undefined) {
    "use strict";

    function MatchDefinitionCheckService($route) {

        function checkIsMatchDefined(handlerAction) {
            if (!$route.current.isMatchDefined()) {
                if (handlerAction) {
                    handlerAction.call(undefined);
                    return;
                }
                throw new Error('The match has not yet been defined');
            }
        }

        return {
            isMatchDefined: checkIsMatchDefined
        };
    }

    this.service('MatchDefinitionCheckService', ['$route', MatchDefinitionCheckService]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule);