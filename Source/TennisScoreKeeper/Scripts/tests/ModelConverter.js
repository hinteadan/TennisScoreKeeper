(function (m) {
    "use strict";

    var matchJson = {
        "Metadata":
            {
                "players": [
                  { "name": "fed", "id": "fed" },
                  { "name": "rafa", "id": "rafa" }],
                "gamesPerSet": 6,
                "setsCount": 3,
                "gameTieMode": { "id": "AdvantageWin" },
                "lastSetTieMode": { "id": "TieBreak", "minimumGamePoints": 7 },
                "startingPlayer": { "name": "fed", "id": "fed" }
            },
        "Points": [{
                "player": { "name": "fed", "id": "fed" }, "creditedTo": { "name": "rafa", "id": "rafa" }, "timestamp": "2013-08-20T22:33:01.998Z","type":{ "label": "Double Fault", "creditTo": 1, "shotStyle": { "label": "Normal/Passing", "id": "NormalPassing" }, "id": "DoubleFault" }, "isOnSecondServe": false
            }, {
                "player": { "name": "fed", "id": "fed" }, "creditedTo": { "name": "rafa", "id": "rafa" }, "timestamp": "2013-08-20T22:33:02.129Z", "type": { "label": "Double Fault", "creditTo": 1, "shotStyle": { "label": "Normal/Passing", "id": "NormalPassing" }, "id": "DoubleFault" }, "isOnSecondServe": false
            }, {
                "player": { "name": "fed", "id": "fed" }, "creditedTo": { "name": "rafa", "id": "rafa" }, "timestamp": "2013-08-20T22:33:02.279Z", "type": { "label": "Double Fault", "creditTo": 1, "shotStyle": { "label": "Normal/Passing", "id": "NormalPassing" }, "id": "DoubleFault" }, "isOnSecondServe": false
            }, {
                "player": { "name": "fed", "id": "fed" }, "creditedTo": { "name": "rafa", "id": "rafa" }, "timestamp": "2013-08-20T22:33:02.419Z", "type": { "label": "Double Fault", "creditTo": 1, "shotStyle": { "label": "Normal/Passing", "id": "NormalPassing" }, "id": "DoubleFault" }, "isOnSecondServe": false
            }, {
                "player": { "name": "fed", "id": "fed" }, "creditedTo": { "name": "rafa", "id": "rafa" }, "timestamp": "2013-08-20T22:33:02.561Z", "type": { "label": "Double Fault", "creditTo": 1, "shotStyle": { "label": "Normal/Passing", "id": "NormalPassing" }, "id": "DoubleFault" }, "isOnSecondServe": false
            }, {
                "player": { "name": "fed", "id": "fed" }, "creditedTo": { "name": "rafa", "id": "rafa" }, "timestamp": "2013-08-20T22:33:02.705Z", "type": { "label": "Double Fault", "creditTo": 1, "shotStyle": { "label": "Normal/Passing", "id": "NormalPassing" }, "id": "DoubleFault" }, "isOnSecondServe": false
            }, {
                "player": { "name": "fed", "id": "fed" }, "creditedTo": { "name": "rafa", "id": "rafa" }, "timestamp": "2013-08-20T22:33:02.851Z", "type": { "label": "Double Fault", "creditTo": 1, "shotStyle": { "label": "Normal/Passing", "id": "NormalPassing" }, "id": "DoubleFault" }, "isOnSecondServe": false
            }, {
                "player": { "name": "fed", "id": "fed" }, "creditedTo": { "name": "rafa", "id": "rafa" }, "timestamp": "2013-08-20T22:33:02.999Z", "type": { "label": "Double Fault", "creditTo": 1, "shotStyle": { "label": "Normal/Passing", "id": "NormalPassing" }, "id": "DoubleFault" }, "isOnSecondServe": false
            }, {
                "player": { "name": "fed", "id": "fed" }, "creditedTo": { "name": "rafa", "id": "rafa" }, "timestamp": "2013-08-20T22:33:03.145Z", "type": { "label": "Double Fault", "creditTo": 1, "shotStyle": { "label": "Normal/Passing", "id": "NormalPassing" }, "id": "DoubleFault" }, "isOnSecondServe": false
            }, {
                "player": { "name": "fed", "id": "fed" }, "creditedTo": { "name": "rafa", "id": "rafa" }, "timestamp": "2013-08-20T22:33:03.295Z", "type": { "label": "Double Fault", "creditTo": 1, "shotStyle": { "label": "Normal/Passing", "id": "NormalPassing" }, "id": "DoubleFault" }, "isOnSecondServe": false
            }, {
                "player": { "name": "fed", "id": "fed" }, "creditedTo": { "name": "fed", "id": "fed" }, "timestamp": "2013-08-20T22:33:03.459Z", "type": { "label": "Double Fault", "creditTo": 0, "shotStyle": { "label": "Normal/Passing", "id": "NormalPassing" }, "id": "Ace" }, "isOnSecondServe": true
            }]
    };

    module("Model Converter");

    test("Convert Metadata", function () {
        var def = m.Convert.Json(matchJson).ToMatchDefinition();

        ok(def.players[0].name === "fed" && def.players[0].id === "fed");
        ok(def.players[1].name === "rafa" && def.players[1].id === "rafa");
        ok(def.gamesPerSet === 6);
        ok(def.setsCount === 3);
        ok(def.gameTieMode === m.TieMode.advantageWin);
        ok(def.lastSetTieMode === m.LastSetTieMode.tiebreak);
        ok(def.startingPlayer === def.players[0]);
    });

    test("Convert points", function () {
        var def = m.Convert.Json(matchJson).ToMatchDefinition(),
            points = m.Convert.Json(matchJson).ToPoints(def);

        ok(points.length === 11);
        ok(points[0].player === def.players[0]);
        ok(points[0].creditedTo === def.players[1]);
        ok(points[0].type.id === m.PointTypes.DoubleFault(m.ShotStyles.NormalPassing).id);
        ok(points[0].type.shotStyle === m.ShotStyles.NormalPassing);
        ok(points[0].isOnSecondServe === false);

        ok(points[10].player === def.players[0]);
        ok(points[10].creditedTo === def.players[0]);
        ok(points[10].type.id === m.PointTypes.Ace(m.ShotStyles.NormalPassing).id);
        ok(points[10].type.shotStyle === m.ShotStyles.NormalPassing);
        ok(points[10].isOnSecondServe === true);
    });

}).call(this, this.H.TennisScoreKeeper.Model);