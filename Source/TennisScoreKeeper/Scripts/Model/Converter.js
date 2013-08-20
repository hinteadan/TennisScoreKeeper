(function (_, undefined) {
    "use strict";

    var m = this;

    function single(collection, id) {
        return _.find(collection, function (t) { return t.id === id; });
    }

    function JsonConverter(jsonData) {

        function convertMetadata() {
            var metaData = jsonData.Metadata,
                matchDefinition = new m.MatchDefinition(
                    new m.Player(metaData.players[0].name),
                    new m.Player(metaData.players[1].name),
                    metaData.startingPlayer.id === metaData.players[1].id
                );

            matchDefinition.gamesPerSet = metaData.gamesPerSet;
            matchDefinition.setsCount = metaData.setsCount;
            matchDefinition.gameTieMode = single(m.TieMode, metaData.gameTieMode.id);
            matchDefinition.lastSetTieMode = single(m.LastSetTieMode, metaData.lastSetTieMode.id);

            return matchDefinition;
        }

        this.ToMatchDefinition = convertMetadata;
    }

    function Converter() {

        this.Json = function (json) { return new JsonConverter(json); }

    }

    this.Convert = new Converter();

}).call(this.H.TennisScoreKeeper.Model, this._);