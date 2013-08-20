(function (tsk, check, _, undefined) {
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

        function convertPoints(matchDefinition) {
            /// <param name="matchDefinition" type="m.MatchDefinition" />
            check.notEmpty(matchDefinition, "matchDefinition");

            var pointFactory = new tsk.PointFactory(matchDefinition.players);

            return _.map(jsonData.Points, function (p) {
                return pointFactory.pointFor(
                    single(matchDefinition.players, p.player.id),
                    m.PointTypes[p.type.id](single(m.ShotStyles, p.type.shotStyle.id)),
                    p.isOnSecondServe
                    );
            });
        }

        this.ToMatchDefinition = convertMetadata;
        this.ToPoints = convertPoints;
    }

    function Converter() {

        this.Json = function (json) { return new JsonConverter(json); }

    }

    this.Convert = new Converter();

}).call(this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper, this.H.Check, this._);