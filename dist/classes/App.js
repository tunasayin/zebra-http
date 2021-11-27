"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var App = (function () {
    function App(_a) {
        var debug = _a.debug, port = _a.port;
        this.server = {
            http: http_1.default.createServer(),
            https: https_1.default.createServer(),
        };
        this.port = port;
    }
    App.prototype.start = function (p) {
        if (p)
            this.port = p;
        this.server.http.listen(this.port);
    };
    return App;
}());
exports.default = App;
