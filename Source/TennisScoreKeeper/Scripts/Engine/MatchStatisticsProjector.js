﻿(function (m, check) {
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
        this.ForcedErrors = 0;
        this.Winners = 0;
        this.PointsOnFirstService = 0;
        this.PointsOnSecondService = 0;
        this.BreakPoints = 0;
        this.BreakPointsWon = 0;
        this.ReceivingPoints = 0;
        this.ReceivingPointsWon = 0;
        this.PointsWonOnOwnMerit = 0;
    }

    function CommonStatistics() {
        this.Points = 0;
        this.Serves = 0;
        this.Aces = 0;
        this.DoubleFaults = 0;
        this.UnforcedErrors = 0;
        this.ForcedErrors = 0;
        this.Winners = 0;
        this.WinnersIncludingAces = 0;
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
                new tsk.ScoreProjectorHooks(onPoint, onGame, onSet, onMatch)),
            setIndex = 0,
            gameIndex = 0,
            pointTypeIds = {
                Ace: m.PointTypes.Ace(m.ShotStyles.NormalPassing).id,
                DoubleFault: m.PointTypes.DoubleFault(m.ShotStyles.NormalPassing).id,
                UnforcedError: m.PointTypes.UnforcedError(m.ShotStyles.NormalPassing).id,
                ForcedError: m.PointTypes.ForcedError(m.ShotStyles.NormalPassing).id,
                WinningShot: m.PointTypes.WinningShot(m.ShotStyles.NormalPassing).id
            };

        function pushNewSet() {
            stats.PerMatch.PerSet.push(
                new StatisticsGroup(gameDefinition.players[0], gameDefinition.players[1], function () {
                    addPerGameStatsForSet.call(this, gameDefinition.players[0], gameDefinition.players[1]);
                })
            );
        }

        function pushNewGame() {
            stats.PerMatch.PerSet[setIndex].PerGame.push(
                new StatisticsGroup(gameDefinition.players[0], gameDefinition.players[1])
            );
        }

        function countPointForStatisticsGroup(data, group) {
            /// <param name="data" type="scoreProjector.HookArgs" />
            /// <param name="group" type="StatisticsGroup" />

            var receivingPlayer = group.ForPlayerOne.Player === data.ServingPlayer 
                ? group.ForPlayerTwo.Player
                : group.ForPlayerOne.Player;

            group.Overall.Points++;
            group.Overall.Serves += data.DecidingPoint.isOnSecondServe ? 2 : 1;
            group.Overall.Aces += data.DecidingPoint.type.id === pointTypeIds.Ace ? 1 : 0;
            group.Overall.DoubleFaults += data.DecidingPoint.type.id === pointTypeIds.DoubleFault ? 1 : 0;
            group.Overall.UnforcedErrors += data.DecidingPoint.type.id === pointTypeIds.UnforcedError ? 1 : 0;
            group.Overall.ForcedErrors += data.DecidingPoint.type.id === pointTypeIds.ForcedError ? 1 : 0;
            group.Overall.Winners += data.DecidingPoint.type.id === pointTypeIds.WinningShot ? 1 : 0;
            group.Overall.WinnersIncludingAces = group.Overall.Winners + group.Overall.Aces;
            group.Overall.BreakPoints += isBreakPoint(data) ? 1 : 0;
            group.Overall.BreakPointsWon += isBreakPointWon(data) ? 1 : 0;

            group.ForPlayer(data.WinningPlayer).Points++;
            group.ForPlayer(data.ServingPlayer).TotalServes += data.DecidingPoint.isOnSecondServe ? 2 : 1;
            group.ForPlayer(data.ServingPlayer).FirstServeIn += data.DecidingPoint.isOnSecondServe ? 0 : 1;
            group.ForPlayer(data.ServingPlayer).SecondServeIn += data.DecidingPoint.isOnSecondServe ? 1 : 0;
            group.ForPlayer(data.WinningPlayer).Aces += data.DecidingPoint.type.id === pointTypeIds.Ace ? 1 : 0;
            group.ForPlayer(data.LosingPlayer).DoubleFaults += data.DecidingPoint.type.id === pointTypeIds.DoubleFault ? 1 : 0;
            group.ForPlayer(data.LosingPlayer).UnforcedErrors += data.DecidingPoint.type.id === pointTypeIds.UnforcedError ? 1 : 0;
            group.ForPlayer(data.LosingPlayer).ForcedErrors += data.DecidingPoint.type.id === pointTypeIds.ForcedError ? 1 : 0;
            group.ForPlayer(data.WinningPlayer).Winners += data.DecidingPoint.type.id === pointTypeIds.WinningShot ? 1 : 0;
            group.ForPlayer(data.WinningPlayer).PointsOnFirstService += data.WinningPlayer === data.ServingPlayer && !data.DecidingPoint.isOnSecondServe ? 1 : 0;
            group.ForPlayer(data.WinningPlayer).PointsOnSecondService += data.WinningPlayer === data.ServingPlayer && data.DecidingPoint.isOnSecondServe ? 1 : 0;
            group.ForPlayer(data.WinningPlayer).BreakPoints += isBreakPoint(data) ? 1 : 0;
            group.ForPlayer(data.WinningPlayer).BreakPointsWon += isBreakPointWon(data) ? 1 : 0;
            group.ForPlayer(receivingPlayer).ReceivingPoints++;
            group.ForPlayer(receivingPlayer).ReceivingPointsWon += data.WinningPlayer === receivingPlayer ? 1 : 0;
            group.ForPlayer(data.WinningPlayer).PointsWonOnOwnMerit += data.DecidingPoint.creditedTo === data.WinningPlayer ? 1 : 0;
        }

        function isBreakPoint(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
            if (data.ServingPlayer === data.DecidingPoint.player 
                || data.WinningGamePoints < 3) {
                return false;
            }

            return (data.WinningGamePoints === 3 && data.LosingGamePoints <= 2)
                || (data.WinningGamePoints - data.LosingGamePoints === 1);
        }

        function isBreakPointWon(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
            if (data.ServingPlayer === data.DecidingPoint.player
                || data.WinningGamePoints < 4) {
                return false;
            }

            return (data.WinningGamePoints === 4 && data.LosingGamePoints <= 2)
                || (data.WinningGamePoints - data.LosingGamePoints === 2);
        }

        function onPoint(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />

            if (!stats.PerMatch.PerSet[setIndex]) {
                pushNewSet();
            }

            countPointForStatisticsGroup(data, stats.PerMatch);
            countPointForStatisticsGroup(data, stats.PerMatch.PerSet[setIndex]);
            countPointForStatisticsGroup(data, stats.PerMatch.PerSet[setIndex].PerGame[gameIndex]);
        }

        function onGame(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
            pushNewGame();
            gameIndex++;
        }

        function onSet(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
            pushNewSet();
            stats.PerMatch.PerSet[setIndex].PerGame.pop();
            gameIndex = 0;
            setIndex++;
        }

        function onMatch(data) {
            /// <param name="data" type="scoreProjector.HookArgs" />
            stats.PerMatch.PerSet.pop();
        }

        function projectPoints(points) {
            /// <param name="points" type="Array" elementType="m.Point" />
            stats = new MatchStatistics(gameDefinition.players[0], gameDefinition.players[1]);
            setIndex = 0;
            gameIndex = 0;

            scoreProjector.processPoints(points);
            return stats;
        }

        this.project = projectPoints;
    }

    this.MatchStatisticsProjector = MatchStatisticsProjector;

}).call(this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Model, this.H.Check);