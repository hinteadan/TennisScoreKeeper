(function (tsk, ui, check, $, angular, _, undefined) {
    'use strict';

    function EventData(metadata, points) {
        check.notEmpty(metadata, 'metadata');
        check.notEmpty(points, 'points');

        this.Metadata = metadata;
        this.Points = points;
    }

    function EventService(matchDefinition, scoreKeeper) {
        ///<param name="matchDefinition" type="tsk.Model.MatchDefinition" />
        ///<param name="scoreKeeper" type="tsk.Engine" />

        var isConnected = false,
            scoreChangedHandlers = [];

        function construct() {
            $.connection.scoreHub.client.scoreChangedTo = raiseScoreChanged;
            $.connection.hub.start().done(function () {
                isConnected = true;
                broadcastScoreChange();
            });
        }

        function broadcastScoreChange() {
            if (!isConnected) {
                console.log('Not yet connected, try again in a few moments.');
                return;
            }

            $.connection.scoreHub.server.
                broadcastScoreChange(new EventData(matchDefinition, scoreKeeper.points));
        }

        function isExistingScoreChangedHandler(handler) {
            return _.any(scoreChangedHandlers, function (h) {
                return h === handler;
            });
        }

        function addScoreChangedHandler(handler) {
            if (!angular.isFunction(handler) || isExistingScoreChangedHandler(handler)) {
                return;
            }
            scoreChangedHandlers.push(handler);
        }

        function removeScoreChangedHandler(handler) {
            if (!angular.isFunction(handler) || !isExistingScoreChangedHandler(handler)) {
                return;
            }
            scoreChangedHandlers = _.without(scoreChangedHandlers, handler);
        }

        function raiseScoreChanged(payload) {
            _.each(scoreChangedHandlers, function (h) {
                h.call(undefined, payload);
            });
        }

        construct();

        this.ScoreChanged = broadcastScoreChange;
        this.AddScoreChangedHandler = addScoreChangedHandler;
        this.RemoveScoreChangedHandler = removeScoreChangedHandler;
    }

    this.service('EventService', ['MatchDefinition', 'ScoreKeeper', EventService]);

    ui.EventService = EventService;

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule,
    this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Ui, this.H.Check, this.$, this.angular, this._);