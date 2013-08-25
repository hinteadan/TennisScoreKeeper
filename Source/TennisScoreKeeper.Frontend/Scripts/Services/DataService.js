(function () {
    "use strict";

    function DataService($resource) {
        var baseUrl = '/TennisScoreKeeper.Backend/MatchData/:id',
            api = $resource(baseUrl, { id: '' }, { change: { method: 'PUT' } });

        return {
            SavedMatches: api.query,
            SaveMatch: api.save,
            UpdateMatch: api.change,
            LoadMatch: function (id, onDone) { return api.get({ id: id }, onDone);}
        };
    }

    this.service('DataService', ['$resource', DataService]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule);