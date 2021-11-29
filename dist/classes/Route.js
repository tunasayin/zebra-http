"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPMethods = exports.Route = void 0;
var HTTPMethods;
(function (HTTPMethods) {
    HTTPMethods["GET"] = "GET";
    HTTPMethods["HEAD"] = "HEAD";
    HTTPMethods["POST"] = "POST";
    HTTPMethods["PUT"] = "PUT";
    HTTPMethods["DELETE"] = "DELETE";
    HTTPMethods["CONNECT"] = "CONNECT";
    HTTPMethods["OPTIONS"] = "OPTIONS";
    HTTPMethods["TRACE"] = "TRACE";
    HTTPMethods["PATCH"] = "PATCH";
})(HTTPMethods || (HTTPMethods = {}));
exports.HTTPMethods = HTTPMethods;
var Route = (function () {
    function Route(path, methods, routeFunction) {
        this.path = path.trim();
        this.methods = __spreadArray([], methods, true);
        this.exec = routeFunction;
    }
    return Route;
}());
exports.Route = Route;
exports.default = Route;
