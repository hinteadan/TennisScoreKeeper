(function (check, undefined) {
    "use strict";

    module("Check Library");

    test("areSame", function () {
        ok(check.areSame(undefined, undefined));
        ok(check.areSame(null, null));
        ok(check.areSame(true, true));
        ok(check.areSame(false, false));
        ok(check.areSame(1, 1));
        ok(check.areSame('', ''));
        ok(check.areSame('test', 'test'));
    });

}).call(this, this.H.Check);