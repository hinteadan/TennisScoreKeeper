(function (tsk, ui, check, undefined) {
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
        
        function broadcastScoreChange() {
            var payload = new EventData(matchDefinition, scoreKeeper.points);
            console.log('Broadcast Score Changed');
            console.log(payload);
        }

        this.ScoreChanged = broadcastScoreChange;
    }

    this.service('EventService', ['MatchDefinition', 'ScoreKeeper', EventService]);

    ui.EventService = EventService;

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule,
    this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Ui, this.H.Check);