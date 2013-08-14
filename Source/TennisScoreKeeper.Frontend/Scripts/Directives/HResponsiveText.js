(function () {
    "use strict";

    function HResponsiveText() {
        this.template = '<span><span class="visible-phone">{{text}}</span>'
            + '<span class="text-big visible-tablet">{{text}}</span>'
            + '<span class="text-bigger visible-desktop">{{text}}</span></span>';
        this.replace = true;
        this.restrict = 'EACM';
        this.scope = {
            text: '@'
        };
    }

    this.directive('hResponsiveLabel', [function () {
        return new HResponsiveText();
    }]);

}).call(this.H.TennisScoreKeeper.Ui.Angular.AppModule);