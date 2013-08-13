(function () {
    "use strict";

    function HomeController($scope, $location) {
        
        function defineNewMatch() {
            $location.path('/DefineMatch');
        }

        $scope.newMatch = defineNewMatch;
    }

    this.controller('HomeController', ['$scope', '$location', HomeController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule);