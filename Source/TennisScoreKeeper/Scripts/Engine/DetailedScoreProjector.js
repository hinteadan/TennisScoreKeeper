﻿(function (check, m, undefined) {
    "use strict";

    var tsk = this;

    function Match() {
        var self = this;

        this.Points = [];
        this.Games = [];
        this.Sets = [];

        this.Score = function () { return self.Sets.length; };
        this.SetScore = function () {
            return self.Sets.length === 0 ? 0 : self.Sets[self.Sets.length - 1].Score();
        };
        this.GameScore = function () {
            return self.Games.length === 0 ? 0 : self.Games[self.Games.length - 1].Score();
        };
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
        var self = this;
        this.PlayerOne = {
            Player: playerOne,
            Score: new Match()
        };
        this.PlayerTwo = {
            Player: playerTwo,
            Score: new Match()
        };
        this.forPlayer = function (player) {
            return self.PlayerOne.Player === player
                ? self.PlayerOne
                : self.PlayerTwo;
        }
    }

    function DetailedScoreProjector(gameDefinition) {
        /// <param name="gameDefinition" type="m.MatchDefinition" />
        check.notEmpty(gameDefinition, "gameDefinition");

        var score = new MatchScore(gameDefinition.players[0], gameDefinition.players[1]),
            scoreProjector = new tsk.ScoreProjector(gameDefinition,
            new tsk.ScoreProjectorHooks(onPoint, onGame, onSet, onMatch));

        function onPoint(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
            var playerScore = score.forPlayer(data.WinningPlayer).Score;
            playerScore.Points.push(data.DecidingPoint);
            if (playerScore.Games.length === 0) {
                playerScore.Games.push(new Game());
            }
            playerScore.Games[playerScore.Games.length - 1].Points.push(data.DecidingPoint);
        }

        function onGame(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
            var playerScore = score.forPlayer(data.WinningPlayer).Score;

            if (playerScore.Sets.length === 0) {
                playerScore.Sets.push(new Set());
            }

            playerScore.Sets[playerScore.Sets.length - 1].Games.push(
                playerScore.Games[playerScore.Games.length - 1]
                );

            playerScore.Games.push(new Game());
            score.forPlayer(data.LosingPlayer).Score.Games.push(new Game());
        }

        function onSet(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
            score.forPlayer(data.WinningPlayer).Score.Sets.push(new Set());
            score.forPlayer(data.LosingPlayer).Score.Sets.push(new Set());
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