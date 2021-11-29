"use strict";
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
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Route_1 = __importDefault(require("./Route"));
var __1 = require("..");
var RouteManager = (function () {
    function RouteManager(debug) {
        this.debug = debug;
        this.routes = [];
    }
    RouteManager.prototype.registerRoute = function (path, methods, routeFunction) {
        if (!path.startsWith("/"))
            throw new Error("Invalid path name was specified while registering route!");
        if (!Array.isArray(methods)) {
            methods = [methods];
        }
        if (!routeFunction)
            throw new Error("Cannot create a route without a route function!");
        for (var i = 0; i < methods.length; i++) {
            if (!__1.HTTPMethods[methods[i]])
                throw new Error("Invalid method was specified while registering route!");
        }
        var route = new Route_1.default(path, methods, routeFunction);
        this.routes.push(route);
        return route;
    };
    RouteManager.prototype._handleRoute = function (req, res, staticRoutes) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var route, staticRoute, i, isFile, _b, _c, err_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        route = this.routes.find(function (x) { return x.path === req.path; });
                        if (route === null || route === void 0 ? void 0 : route.methods.includes(req.method)) {
                            try {
                                if (this.debug)
                                    console.log("\u001B[32m[hTunaTP]\u001B[0m: Recieved, a request executing route " + route.path + ".");
                                route === null || route === void 0 ? void 0 : route.exec(req, res);
                            }
                            catch (err) {
                                this._handleRouteError(res, err);
                            }
                        }
                        if (!(req.method === "GET")) return [3, 8];
                        staticRoute = staticRoutes.find(function (x) { return x.path === req.path; });
                        if (!staticRoute) return [3, 8];
                        i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(i < staticRoute.content.length)) return [3, 8];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 6, , 7]);
                        return [4, fs_1.default.statSync(staticRoute.content[i])];
                    case 3:
                        isFile = (_a = (_d.sent())) === null || _a === void 0 ? void 0 : _a.isFile();
                        if (!isFile) return [3, 5];
                        _c = (_b = res.rawResponse).end;
                        return [4, fs_1.default.readFileSync(staticRoute.content[i])];
                    case 4:
                        _c.apply(_b, [_d.sent()]);
                        return [3, 5];
                    case 5: return [3, 7];
                    case 6:
                        err_1 = _d.sent();
                        throw err_1;
                    case 7:
                        i++;
                        return [3, 1];
                    case 8: return [2];
                }
            });
        });
    };
    RouteManager.prototype._handleRouteError = function (res, err) {
        return __awaiter(this, void 0, void 0, function () {
            var html, parsedHTML;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.debug)
                            return [2];
                        return [4, fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", "templates", "error.html"), "utf-8")];
                    case 1:
                        html = _a.sent();
                        parsedHTML = html
                            .replace("$error_name", err.name)
                            .replace("$error_message", err.message)
                            .replace("$error_stack", err.stack
                            ? err.stack
                                .toString()
                                .replace(err.name, "")
                                .replace(err.message, "")
                                .replace(": ", "")
                            : "None");
                        res.sendHTML(parsedHTML).end();
                        return [2];
                }
            });
        });
    };
    return RouteManager;
}());
exports.default = RouteManager;
