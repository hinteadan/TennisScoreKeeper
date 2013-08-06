(function (undefined) {
    "use strict";

    function notEmpty(param, paramName) {
        if (param === undefined || param === null) {
            throw new Error("Parameter '"
                + paramName
                + "' cannot be null or undefined");
        }
    }

    function isEmpty(param) {
        return param === undefined || param === null;
    }

    function isNotEmpty(param) {
        return !isEmpty(param);
    }

    this.notEmpty = notEmpty;
    this.isEmpty = isEmpty;
    this.isNotEmpty = isNotEmpty;

}).call(this.H.Check);