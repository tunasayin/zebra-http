"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteFuncition_1 = require("./RouteFuncition");
var Route = (function () {
    function Route(path, methods, routeFunction) {
        this.path = path.trim();
        this.routeFunctions = [new RouteFuncition_1.RouteFunction(methods, routeFunction)];
    }
    Route.prototype.getAvailableMethods = function () {
        var methods = [];
        this.routeFunctions.forEach(function (routeFunc) {
            routeFunc.methods.forEach(function (method) {
                if (!methods.includes(method))
                    methods.push(method);
            });
        });
        return methods;
    };
    Route.prototype.executeRelatedRoutes = function (method, req, res) {
        for (var i = 0; i < this.routeFunctions.length; i++) {
            if (this.routeFunctions[i].methods.includes(method)) {
                this.routeFunctions[i].execute(req, res);
            }
        }
    };
    return Route;
}());
exports.default = Route;
