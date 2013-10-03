(function (tsk, ui, undefined) {
    'use strict';

    function EventService() {
        
        function broadcastScoreChange() {
            console.log('Broadcast Score Changed');
        }

        this.ScoreChanged = broadcastScoreChange;
    }

    this.service('EventService', [EventService]);

    ui.EventService = EventService;

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule, this.H.TennisScoreKeeper, this.H.TennisScoreKeeper.Ui);