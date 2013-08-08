﻿(function (undefined) {
    "use strict";

    function notEmpty(param, paramName) {
        if (param === undefined || param === null) {
            throw new Error("Parameter '"
                + paramName
                + "' cannot be null or undefined");
        }
    }

    function condition(conditionResult, message) {
        if (!conditionResult) {
            throw new Error(message || "An error occured");
        }
    }

    function isEmpty(param) {
        return param === undefined || param === null;
    }

    function isNotEmpty(param) {
        return !isEmpty(param);
    }

    function sameObjects(first, second) {
        var firstType = typeof(first),
            secondType = typeof(second);

        if (first === null && second === null) {
            return true;
        }

        if (firstType !== secondType) {
            return false;
        }

        if (firstType !== 'object' && secondType !== 'object') {
            return first == second;
        }

        var areSame = true;
        for (var prop in first) {
            areSame = areSame && sameObjects(first[prop], second[prop]);
            if (!areSame) {
                return false;
            }
        }
        return true;
    }

    this.notEmpty = notEmpty;
    this.condition = condition;
    this.isEmpty = isEmpty;
    this.isNotEmpty = isNotEmpty;
    this.areSame = sameObjects;

}).call(this.H.Check);