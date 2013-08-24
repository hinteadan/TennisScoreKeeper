(function (m, check) {
    "use strict";

    var tsk = this;

    function PlayerStatistics() {
        this.Points = 0;
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

    function StatisticsGroup(playerOne, playerTwo, extendCallback) {
        check.notEmpty(playerOne, "playerOne");
        check.notEmpty(playerTwo, "playerTwo");

        this.Overall = new CommonStatistics();
        this.ForPlayerOne = {
            Player: playerOne,
            Statistics: new PlayerStatistics()
        };
        this.ForPlayerTwo = {
            Player: playerTwo,
            Statistics: new PlayerStatistics()
        };

        this.ForPlayer = function (player) {
            return this.ForPlayerOne.Player === player
                ? this.ForPlayerOne.Statistics
                : this.ForPlayerTwo.Statistics;
        }

        if (extendCallback) {
            extendCallback.call(this, this);
        }
    }

    function addPerGameStatsForSet(playerOne, playerTwo) {
        this.PerGame = [new StatisticsGroup(playerOne, playerTwo)];
    }

    function MatchStatistics(playerOne, playerTwo) {
        check.notEmpty(playerOne, "playerOne");
        check.notEmpty(playerTwo, "playerTwo");

        this.PerMatch = new StatisticsGroup(playerOne, playerTwo, function () {
            this.PerSet = [new StatisticsGroup(playerOne, playerTwo, function () {
                addPerGameStatsForSet.call(this, playerOne, playerTwo);
            })]
        });
    }

    function MatchStatisticsProjector(gameDefinition) {
        /// <param name="gameDefinition" type="m.MatchDefinition" />
        check.notEmpty(gameDefinition, "gameDefinition");

        var stats = new MatchStatistics(gameDefinition.players[0], gameDefinition.players[1]),
            scoreProjector = new tsk.ScoreProjector(gameDefinition,
                new tsk.ScoreProjectorHooks(onPoint, onGame, onSet, onMatch, onServeChange)),
            setIndex = 0,
            gameIndex = 0;

        function newSet(perSetArray) {
            perSetArray.push(
                new StatisticsGroup(gameDefinition.players[0], gameDefinition.players[1], function () {
                    addPerGameStatsForSet.call(this, gameDefinition.players[0], gameDefinition.players[1]);
                })
            );
        }

        function onPoint(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />

            if (!stats.PerMatch.PerSet[setIndex]) {
                newSet(stats.PerMatch.PerSet);
            }

            stats.PerMatch.Overall.Points++;
            stats.PerMatch.ForPlayer(data.WinningPlayer).Points++;
            stats.PerMatch.PerSet[setIndex].Overall.Points++;
            stats.PerMatch.PerSet[setIndex].ForPlayer(data.WinningPlayer).Points++;
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

        function onServeChange(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
            
        }

        function projectPoints(points) {
            /// <param name="points" type="Array" elementType="m.Point" />
            stats = new MatchStatistics(gameDefinition.players[0], gameDefinition.players[1]);
            scoreProjector.processPoints(points);
            return stats;
        }

        this.project = projectPoints;
    }

    this.MatchStatisticsProjector = MatchStatisticsProjector;

}).call(this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Model, this.H.Check);