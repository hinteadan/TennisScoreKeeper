(function (m) {
    "use strict";

    function PlayerStatistics() {
        this.TotalServes = 0;
        this.FirstServeIn = 0;
        this.SecondServeIn = 0;
        this.Aces = 0;
        this.DoubleFaults = 0;
        this.UnforcedErrors = 0;
        this.Winners = 0;
        this.PointsOnFirstService = 0;
        this.PointsOnSecondService = 0;
        this.WinningPointsOnFirstService = 0;
        this.WinningPointsOnSecondService = 0;
        this.BreakPoints = 0;
        this.BreakPointsWon = 0;
        this.ReceivingPoints = 0;
        this.ReceivingPointsWon = 0;
        this.PointsWon = 0;
    }

    function CommonStatistics() {
        this.Points = 0;
        this.Serves = 0;
        this.Aces = 0;
        this.DoubleFaults = 0;
        this.UnforcedErrors = 0;
        this.Winners = 0;
        this.BreakPoints = 0;
        this.BreakPointsWon = 0;
    }

}).call(this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Model);