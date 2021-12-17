"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var Request = (function () {
    function Request(res) {
        var _this = this;
        var _a;
        this.rawRequest = res;
        this.method = this.rawRequest.method || constants_1.HTTPMethods.GET;
        this.path = this.rawRequest.url;
        this.cookies = {};
        (_a = this.rawRequest.headers.cookie) === null || _a === void 0 ? void 0 : _a.toString().split(";").forEach(function (cookie) {
            var _a;
            var parsedCookie = cookie.split("=");
            Object.assign(_this.cookies, (_a = {}, _a[parsedCookie[0]] = parsedCookie[1], _a));
        });
    }
    Request.prototype.getCookie = function (cookieName) {
        return this.cookies[cookieName] || null;
    };
    return Request;
}());
exports.default = Request;
