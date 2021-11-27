"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Route_1 = __importDefault(require("./Route"));
var RouteManager = (function () {
    function RouteManager() {
        this.routes = [];
    }
    RouteManager.prototype.createRoute = function (methods, routeFunction) {
        if (!Array.isArray(methods)) {
            methods = [methods];
        }
        var route = new Route_1.default(methods, routeFunction);
        this.routes.push(route);
        return route;
    };
    RouteManager.prototype._handleRoute = function () { };
    return RouteManager;
}());
exports.default = RouteManager;
