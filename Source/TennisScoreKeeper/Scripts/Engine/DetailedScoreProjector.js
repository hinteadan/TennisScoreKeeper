(function (check, m) {
    "use strict";

    var tsk = this;

    function DetailedScoreProjector(gameDefinition) {
        /// <param name="gameDefinition" type="m.MatchDefinition" />
        check.notEmpty(gameDefinition, "gameDefinition");

        var scoreProjector = new tsk.ScoreProjector(gameDefinition);
    }

    this.DetailedScoreProjector = DetailedScoreProjector;

}).call(this.H.TennisScoreKeeper, this.H.Check, this.H.TennisScoreKeeper.Model);