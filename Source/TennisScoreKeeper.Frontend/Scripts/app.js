(function (angular, m, tsk) {
    "use strict";

    var appModule = angular.module('H.TennisScoreKeeperUi', ['ngResource']),
        isDefined = false;

    function markMatchAsDefined() {
        isDefined = true;
    }

    function isMatchDefined() {
        return isDefined;
    }

    appModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', { controller: 'HomeController', templateUrl: 'Views/Home.html' })
            .when('/DefineMatch', {
                controller: 'NewMatchController', templateUrl: 'Views/NewMatch.html',
                markMatchAsDefined: markMatchAsDefined
            })
            .when('/Play', { 
                controller: 'MatchPlayController', templateUrl: 'Views/MatchPlay.html', 
                isMatchDefined:  isMatchDefined
            })
            .when('/Score', {
                controller: 'DetailedScoreController', templateUrl: 'Views/DetailedScore.html',
                isMatchDefined: isMatchDefined
            })
            .otherwise({ redirectTo: '/' });
    }]);

    appModule.service('MatchDefinition', function () {
        return new m.MatchDefinition(
            new m.Player(''),
            new m.Player('')
            );
    });

    appModule.service('ScoreKeeper', ['MatchDefinition', function (matchDefinition) {
        return new tsk.Engine(matchDefinition);
    }]);

    appModule.service('DetailedScoreProjector', ['MatchDefinition', function (matchDefinition) {
        return new tsk.DetailedScoreProjector(matchDefinition);
    }]);

    this.AppModule = appModule;

}).call(this.H.TennisScoreKeeper.Ui.Angular, this.angular, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);