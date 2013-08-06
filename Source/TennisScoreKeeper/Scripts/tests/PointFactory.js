(function (m, tsk) {
    "use strict";

    var fed = new m.Player("Roger Federer"),
        rafa = new m.Player("Rafael Nadal"),
        factory = new tsk.PointFactory([fed, rafa]);

    module("Point Factory");

    test("Point is credited accordingly", function () {
        ok(factory.pointFor(fed, m.PointTypes.WinningShot(m.ShotStyles.NormalPassing)).creditedTo === fed);
        ok(factory.pointFor(fed, m.PointTypes.ForcedError(m.ShotStyles.NormalPassing)).creditedTo === fed);
        ok(factory.pointFor(fed, m.PointTypes.UnforcedError(m.ShotStyles.NormalPassing)).creditedTo === rafa);
    });

}).call(this, this.H.TennisScoreKeeper.Model, this.H.TennisScoreKeeper);