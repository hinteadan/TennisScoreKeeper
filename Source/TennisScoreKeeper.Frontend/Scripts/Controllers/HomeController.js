(function (m, undefined) {
    "use strict";

    function HomeController($scope, $location, $route, dataService) {
        
        function defineNewMatch() {
            $location.path('/DefineMatch');
        }

        function loadMatch(id) {
            var matchData = dataService.LoadMatch(id, function () {
                var matchDefinition = m.Convert.Json(matchData).ToMatchDefinition(),
                    points = m.Convert.Json(matchData).ToPoints(matchDefinition);

                $route.current.setupMatchDefinition(matchDefinition);
                $route.current.setupEngine(points);
                $route.current.markMatchAsDefined();
                $location.path('/Play/' + id);
            });
        }

        $scope.newMatch = defineNewMatch;
        $scope.savedMatches = dataService.SavedMatches();
        $scope.loadMatch = loadMatch;
    }

    this.controller('HomeController', ['$scope', '$location', '$route', 'DataService', HomeController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper.Model);