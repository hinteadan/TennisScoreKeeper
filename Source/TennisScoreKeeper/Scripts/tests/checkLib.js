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
        ok(check.areSame({}, {}));
        ok(check.areSame({ Id: 1 }, { Id: 1 }));
        ok(check.areSame({ Id: 1, Name: 'Test' }, { Id: 1, Name: 'Test' }));
        ok(check.areSame({ Id: 1, Name: 'Test', IsAdmin: false }, { Id: 1, Name: 'Test', IsAdmin: false }));
        ok(check.areSame({ Id: 1, Name: 'Test', IsAdmin: false, Child: { Id: 1, Name: 'Test' } },
            { Id: 1, Name: 'Test', IsAdmin: false, Child: { Id: 1, Name: 'Test' } }));
        ok(check.areSame({ Id: 1, Name: 'Test', IsAdmin: false, Child: { Id: 1, Name: 'Test', Child: {} } },
            { Id: 1, Name: 'Test', IsAdmin: false, Child: { Id: 1, Name: 'Test', Child: {} } }));
        ok(check.areSame({ Id: 1, Name: 'Test', IsAdmin: false, Child: { Id: 1, Name: 'Test', Child: { Id: 1 } } },
            { Id: 1, Name: 'Test', IsAdmin: false, Child: { Id: 1, Name: 'Test', Child: { Id: 1 } } }));

        ok(!check.areSame('', 1));
        ok(!check.areSame({ Id: 1 }, { Id: 2 }));
        ok(!check.areSame({ Id: 1 }, {}));
        ok(!check.areSame({ Id: 1, Child: {} }, { Id: 1 }));
    });

}).call(this, this.H.Check);