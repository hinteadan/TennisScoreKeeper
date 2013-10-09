(function (tsk, ui, check, $, undefined) {
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

        var isConnected = false;

        function construct() {
            $.connection.scoreHub.client.scoreChangedTo = scoreChangedTo;
            $.connection.hub.start().done(function () {
                isConnected = true;
                broadcastScoreChange();
            });
        }

        function scoreChangedTo(scoreData){
            /// <param name="scoreData" type="EventData" />
            console.log('Score Changed To');
            console.log(scoreData);
        }

        function broadcastScoreChange() {
            if (!isConnected) {
                console.log('Not yet connected, try again in a few moments.');
                return;
            }

            $.connection.scoreHub.server.
                broadcastScoreChange(new EventData(matchDefinition, scoreKeeper.points));
        }

        construct();

        this.ScoreChanged = broadcastScoreChange;
    }

    this.service('EventService', ['MatchDefinition', 'ScoreKeeper', EventService]);

    ui.EventService = EventService;

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule,
    this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Ui, this.H.Check, this.$);