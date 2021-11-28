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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        this._handleRoute(new Request_1.default(req), new Response_1.default(res));
    };
    App.prototype.serve = function (path, directory) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        if (path.startsWith("/"))
                            reject("Invalid path was specified!");
                        resolve();
                    })];
            });
        });
    };
    return App;
}(RouteManager_1.default));
exports.default = App;
