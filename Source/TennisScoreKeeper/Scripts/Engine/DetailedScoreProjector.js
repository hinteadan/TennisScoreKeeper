(function (check, m) {
    "use strict";

    function DetailedScoreProjector(gameDefinition) {
        /// <param name="gameDefinition" type="m.MatchDefinition" />
        check.notEmpty(gameDefinition, "gameDefinition");
    }

}).call(this.H.TennisScoreKeeper, this.H.Check, this.H.TennisScoreKeeper.Model);