(function () {
    "use strict";

    function HomeController($scope, $location, dataService) {
        
        function defineNewMatch() {
            $location.path('/DefineMatch');
        }

        function loadMatch(id) {
            var matchData = dataService.LoadMatch(id, function () {
                var a = matchData;
                debugger;
            });
        }

        $scope.newMatch = defineNewMatch;
        $scope.savedMatches = dataService.SavedMatches();
        $scope.loadMatch = loadMatch;
    }

    this.controller('HomeController', ['$scope', '$location', 'DataService', HomeController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule);