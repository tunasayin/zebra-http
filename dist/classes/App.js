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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var Response_1 = __importDefault(require("./Response"));
var Request_1 = __importDefault(require("./Request"));
var RouteManager_1 = __importDefault(require("./RouteManager"));
var App = (function (_super) {
    __extends(App, _super);
    function App(_a) {
        var debug = _a.debug, useSSL = _a.useSSL, keys = _a.keys;
        var _this = _super.call(this) || this;
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
            throw new Error("\u001B[32m[hTunaTP]\u001B[0m: An unexpected error occued while starting HTTP server. \n" + err);
        }
        if (this.keys) {
            try {
                (_a = this.servers.https) === null || _a === void 0 ? void 0 : _a.listen(this.ports.https);
                canRun += 1;
            }
            catch (err) {
                throw new Error("\u001B[32m[hTunaTP]\u001B[0m: An unexpected error occured while starting HTTPS server. \n" + err);
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
        if (this.keys && isHTTP) {
            res.writeHead(301, {
                Location: "https://" + req.headers["host"] + req.url,
            });
            res.end();
            return;
        }
        var HTunaTPResponse = new Response_1.default(res);
        var HTunaTPRequest = new Request_1.default(req);
        var route = this.routes.find(function (x) { return x.path === HTunaTPRequest.path; });
        if (route === null || route === void 0 ? void 0 : route.methods.includes(HTunaTPRequest.method)) {
            try {
                if (this.debug)
                    console.log("\u001B[32m[hTunaTP]\u001B[0m: Recieved a request executing route " + route.path + ".");
                route.exec(HTunaTPRequest, HTunaTPResponse);
            }
            catch (err) {
                throw err;
            }
        }
    };
    return App;
}(RouteManager_1.default));
exports.default = App;
