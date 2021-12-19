"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var Response_1 = __importDefault(require("./Response"));
var Request_1 = __importDefault(require("./Request"));
var StaticRoute_1 = __importDefault(require("./StaticRoute"));
var MiddlewareManager_1 = __importDefault(require("./MiddlewareManager"));
var constants_1 = require("../constants");
var App = (function (_super) {
    __extends(App, _super);
    function App(_a) {
        var debug = _a.debug, useSSL = _a.useSSL, keys = _a.keys;
        var _this = _super.call(this, debug) || this;
        _this.servers = {
            http: http_1.default.createServer(function (req, res) {
                _this._handleRequest(req, res, true);
            }),
            https: null,
        };
        _this.debug = debug;
        _this.ports = {
            http: null,
            https: 443,
        };
        _this.staticRoutes = [];
        if (useSSL) {
            if (!keys)
                throw new Error("Cannot create ssl server without ssl keys.");
            if (_this.debug)
                process.emitWarning("Using ssl server with debug mode is not recommended please consider not using ssl while debugging your server.");
            _this.keys = keys;
            _this.servers.https = https_1.default.createServer(_this.keys, function (req, res) {
                _this._handleRequest(req, res, false);
            });
        }
        else {
            _this.keys = null;
        }
        return _this;
    }
    App.prototype.start = function (httpPort, started) {
        var _a;
        var canRun = 0;
        if (!httpPort)
            throw new Error("Cannot start server witout a port");
        this.ports.http = httpPort;
        try {
            this.servers.http.listen(httpPort);
            canRun += 1;
        }
        catch (err) {
            throw new Error("\u001B[32m[beaver-http]\u001B[0m: An unexpected error occued while starting HTTP server. \n".concat(err));
        }
        if (this.keys) {
            try {
                (_a = this.servers.https) === null || _a === void 0 ? void 0 : _a.listen(this.ports.https);
                canRun += 1;
            }
            catch (err) {
                throw new Error("\u001B[32m[beaver-http]\u001B[0m: An unexpected error occured while starting HTTPS server. \n".concat(err));
            }
        }
        else {
            canRun += 1;
        }
        if (started) {
            while (canRun == 2) {
                started();
                if (this.ports.http !== 80 && this.keys) {
                    process.emitWarning("Using a port diffrent than 80 while using ssl is not recommended please consider chaning the port to 80.");
                }
                canRun = 3;
            }
        }
    };
    App.prototype._handleRequest = function (req, res, isHTTP) {
        var _a;
        if (this.keys && isHTTP) {
            res.writeHead(301, {
                Location: "https://" + req.headers["host"] + req.url,
            });
            res.end();
            return;
        }
        var request = new Request_1.default(req);
        var response = new Response_1.default(res);
        _a = this.executeMiddlewares(request, response), request = _a[0], response = _a[1];
        this._handleRoute(request, response, this.staticRoutes);
    };
    App.prototype.serve = function (urlPath, folderPath) {
        if (!urlPath.startsWith("/"))
            throw new Error("Invalid url path was specified for static route");
        var urlExists = this.staticRoutes.find(function (x) { return x.path === urlPath; })
            ? true
            : false;
        if (urlExists)
            throw new Error("Already crated a static route at" + urlPath + "");
        var route = new StaticRoute_1.default(urlPath, folderPath);
        this.staticRoutes.push(route);
        return route;
    };
    App.prototype.get = function (route, routeFunction) {
        this.registerRoute(route, [constants_1.HTTPMethods.GET], routeFunction);
    };
    App.prototype.head = function (route, routeFunction) {
        this.registerRoute(route, [constants_1.HTTPMethods.HEAD], routeFunction);
    };
    App.prototype.post = function (route, routeFunction) {
        this.registerRoute(route, [constants_1.HTTPMethods.POST], routeFunction);
    };
    App.prototype.put = function (route, routeFunction) {
        this.registerRoute(route, [constants_1.HTTPMethods.PUT], routeFunction);
    };
    App.prototype.delete = function (route, routeFunction) {
        this.registerRoute(route, [constants_1.HTTPMethods.DELETE], routeFunction);
    };
    App.prototype.patch = function (route, routeFunction) {
        this.registerRoute(route, [constants_1.HTTPMethods.PATCH], routeFunction);
    };
    App.prototype.all = function (route, routeFunction) {
        var methodsArray = __spreadArray([], Object.getOwnPropertyNames(constants_1.HTTPMethods), true);
        this.registerRoute(route, methodsArray, routeFunction);
    };
    return App;
}(MiddlewareManager_1.default));
exports.default = App;
