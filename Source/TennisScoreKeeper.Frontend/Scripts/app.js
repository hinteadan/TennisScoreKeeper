﻿(function (angular, m, tsk) {
    "use strict";

    var appModule = angular.module('H.TennisScoreKeeperUi', ['ngResource']);
    appModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', { controller: 'HomeController', templateUrl: 'Views/Home.html' })
            .when('/DefineMatch', { controller: 'NewMatchController', templateUrl: 'Views/NewMatch.html' })
            .when('/Play', { controller: 'MatchPlayController', templateUrl: 'Views/MatchPlay.html' })
            .when('/Score', { controller: 'DetailedScoreController', templateUrl: 'Views/DetailedScore.html' })
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