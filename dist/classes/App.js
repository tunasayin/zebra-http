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
var path_1 = __importDefault(require("path"));
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
            throw new Error("\u001B[32m[zibra]\u001B[0m: An unexpected error occued while starting HTTP server. \n".concat(err));
        }
        if (this.keys) {
            try {
                (_a = this.servers.https) === null || _a === void 0 ? void 0 : _a.listen(this.ports.https);
                canRun += 1;
            }
            catch (err) {
                throw new Error("\u001B[32m[zibra]\u001B[0m: An unexpected error occured while starting HTTPS server. \n".concat(err));
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
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.keys && isHTTP) {
                            res.writeHead(301, {
                                Location: "https://" + req.headers["host"] + req.url,
                            });
                            res.end();
                            return [2];
                        }
                        if (!req.readable) return [3, 2];
                        return [4, new Promise(function (resolve) {
                                var data = "";
                                req.on("data", function (chunk) { return (data += chunk); });
                                req.on("end", function () {
                                    if (data.length != 0) {
                                        try {
                                            var json = JSON.parse(data);
                                            data = json;
                                        }
                                        catch (err) { }
                                        Object.assign(req, { body: data });
                                    }
                                    resolve(null);
                                });
                            })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        request = new Request_1.default(req);
                        response = new Response_1.default(res);
                        _a = this.executeMiddlewares(request, response), request = _a[0], response = _a[1];
                        this._handleRoute(request, response, this.staticRoutes);
                        return [2];
                }
            });
        });
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
    App.prototype.useRouter = function (router) {
        var _this = this;
        router.routes.forEach(function (route) {
            var routePath = path_1.default
                .normalize(path_1.default.join(router.path, route.path))
                .replace(/\\/g, "/");
            route.routeFunctions.forEach(function (routeFunc) {
                _this.registerRoute(routePath, routeFunc.methods, routeFunc.execute);
            });
        });
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
