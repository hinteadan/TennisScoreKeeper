(function () {
    "use strict";

    function DataService($resource) {
        var baseUrl = 'http://localhost/TennisScoreKeeper.Backend/MatchData/:id',
            api = $resource(baseUrl, {id: ''});

        return {
            AllSavedMatches: api.query,
            SaveMatch: api.save
        };
    }

    this.service('DataService', ['$resource', DataService]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule);