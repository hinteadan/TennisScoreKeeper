(function (angular) {
    "use strict";

    var appModule = angular.module('H.TennisScoreKeeperUi', []);
    appModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', { controller: 'HomeController', templateUrl: 'Views/Home.html' })
            .when('/DefineMatch', { controller: 'NewMatchController', templateUrl: 'Views/NewMatch.html' })
            .when('/Play', { controller: 'MatchPlayController', templateUrl: 'Views/MatchPlay.html' });
    }]);

    this.AppModule = appModule;

}).call(this.H.TennisScoreKeeper.Ui.Angular, this.angular);