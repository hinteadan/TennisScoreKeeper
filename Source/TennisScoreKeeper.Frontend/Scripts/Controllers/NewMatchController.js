(function () {
    "use strict";

    function NewMatchController($scope, $location) {

        function startMatch() {
            $location.path('/Play');
        }

        $scope.play = startMatch;
    }

    this.controller('NewMatchController', ['$scope', '$location', NewMatchController]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule);