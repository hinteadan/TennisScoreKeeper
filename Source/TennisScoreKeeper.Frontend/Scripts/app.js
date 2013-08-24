(function (angular, m, tsk, check, undefined) {
    "use strict";

    var appModule = angular.module('H.TennisScoreKeeperUi', ['ngResource']),
        isDefined = false,
        matchDefinition = new m.MatchDefinition(new m.Player(''), new m.Player('')),
        engine = new tsk.Engine(matchDefinition);

    function markMatchAsDefined() {
        isDefined = true;
    }

    function markMatchAsUnDefined() {
        isDefined = false;
    }

    function loadMatchDefinition(loadedMatchDefinition) {
        check.notEmpty(loadedMatchDefinition, "loadedMatchDefinition");
        matchDefinition = loadedMatchDefinition;
    }

    function loadEngine(points) {
        engine = new tsk.Engine(matchDefinition, points);
    }

    function isMatchDefined() {
        return isDefined;
    }

    appModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController', templateUrl: 'Views/Home.html',
                markMatchAsDefined: markMatchAsDefined,
                setupMatchDefinition: loadMatchDefinition,
                setupEngine: loadEngine
            })
            .when('/DefineMatch', {
                controller: 'NewMatchController', templateUrl: 'Views/NewMatch.html',
                markMatchAsDefined: markMatchAsDefined,
                markMatchAsUnDefined: markMatchAsUnDefined,
                setupMatchDefinition: loadMatchDefinition,
                setupEngine: loadEngine
            })
            .when('/Play', { 
                controller: 'MatchPlayController', templateUrl: 'Views/MatchPlay.html', 
                isMatchDefined:  isMatchDefined
            })
            .when('/Score', {
                controller: 'DetailedScoreController', templateUrl: 'Views/DetailedScore.html',
                isMatchDefined: isMatchDefined
            })
            .when('/Stats', {
                controller: 'StatsController', templateUrl: 'Views/Stats.html',
                isMatchDefined: isMatchDefined
            })
            .otherwise({ redirectTo: '/' });
    }]);

    appModule.service('MatchDefinition', function () {
        return matchDefinition;
    });
    appModule.service('ScoreKeeper', function () {
        return engine;
    });
    appModule.service('DetailedScoreProjector', ['MatchDefinition', tsk.DetailedScoreProjector]);
    appModule.service('StatsProjector', ['MatchDefinition', tsk.MatchStatisticsProjector]);

    this.AppModule = appModule;

}).call(this.H.TennisScoreKeeper.Ui.Angular,
        this.angular,
        this.H.TennisScoreKeeper.Model,
        this.H.TennisScoreKeeper, this.H.Check);