(function () {
    "use strict";

    function DataService($resource) {
        var baseUrl = 'http://localhost/TennisScoreKeeper.Backend/MatchData/:id',
            api = $resource(baseUrl, {id: ''});

        return {
            SavedMatches: api.query,
            SaveMatch: api.save,
            LoadMatch: function (id, onDone) { return api.get({ id: id }, onDone);}
        };
    }

    this.service('DataService', ['$resource', DataService]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule);