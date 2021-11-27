"use strict";
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
    function Route(methods, routeFunction) {
        this.methods = [];
        this.exec = routeFunction;
    }
    return Route;
}());
exports.Route = Route;
exports.default = Route;
