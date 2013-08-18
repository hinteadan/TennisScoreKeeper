(function (check, m, undefined) {
    "use strict";

    var tsk = this;

    function Match() {
        var self = this;
        this.Sets = [];
        this.Score = function () { return self.Sets.length; };
    }

    function Set() {
        var self = this;
        this.Games = [];
        this.TiebreakGame = undefined;
        this.Score = function () { return self.Games.length + (self.TiebreakGame !== undefined ? 1 : 0); };
    }

    function Game() {
        var self = this;
        this.Points = [];
        this.Score = function () { return self.Points.length; };
    }

    function MatchScore(playerOne, playerTwo) {
        this.PlayerOne = {
            Player: playerOne,
            Score: new Match()
        };
        this.PlayerTwo = {
            Player: playerOne,
            Score: new Match()
        };
    }

    function DetailedScoreProjector(gameDefinition) {
        /// <param name="gameDefinition" type="m.MatchDefinition" />
        check.notEmpty(gameDefinition, "gameDefinition");

        var score = undefined,
            scoreProjector = new tsk.ScoreProjector(gameDefinition,
            new tsk.ScoreProjectorHooks(onPoint, onGame, onSet, onMatch));

        function onPoint(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
        }

        function onGame(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
        }

        function onSet(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
        }

        function onMatch(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
        }

        function projectPoints(points) {
            /// <param name="points" type="Array" elementType="m.Point" />
            score = new MatchScore(gameDefinition.players[0], gameDefinition.players[1]);
            scoreProjector.processPoints(points);
            return score;
        }

        this.projectScore = projectPoints;
    }

    this.DetailedScoreProjector = DetailedScoreProjector;

}).call(this.H.TennisScoreKeeper, this.H.Check, this.H.TennisScoreKeeper.Model);