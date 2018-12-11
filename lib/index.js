"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handler = /** @class */ (function () {
    function Handler() {
        this.hasInit = false;
        // this.identifier = options.identifier;
    }
    Handler.prototype.init = function (options) {
        this.hasInit = true;
        this.applicants = options.applicants;
    };
    Handler.prototype.register = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.checkInitStatus();
        return typeof Handler;
    };
    Handler.prototype.checkInitStatus = function () {
        if (!this.hasInit)
            throw Error("Handler needs to be initialized.");
    };
    return Handler;
}());
exports.default = new Handler();
