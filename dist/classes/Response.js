"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var Response = (function () {
    function Response(res) {
        this.rawResponse = res;
    }
    Response.prototype.setStatus = function (status) {
        this.rawResponse.writeHead(status);
        return this;
    };
    Response.prototype.sendText = function (data) {
        this.rawResponse.setHeader("Content-Type", "text/plain");
        this.rawResponse.write(data);
        return this;
    };
    Response.prototype.sendHTML = function (htmlData) {
        this.rawResponse.setHeader("Content-Type", "text/html");
        this.rawResponse.write(htmlData);
        return this;
    };
    Response.prototype.sendJSON = function (jsonData) {
        this.rawResponse.setHeader("Content-Type", "application/json");
        this.rawResponse.write(JSON.stringify(jsonData));
        return this;
    };
    Response.prototype.sendFile = function (filePath) {
        this.rawResponse.write(fs_1.default.readFileSync(filePath));
        return this;
    };
    Response.prototype.setCookie = function (cookieName, cookieValue, options) {
        this.rawResponse.setHeader("Set-Cookie", (cookieName + "=" + cookieValue + ";" + ((options === null || options === void 0 ? void 0 : options.expires) ? "Expires=" + options.expires + ";" : "") + "\n       " + ((options === null || options === void 0 ? void 0 : options.maxAge) ? "Max-Age=" + options.maxAge + ";" : "") + "\n       " + ((options === null || options === void 0 ? void 0 : options.domain) ? "Domain=" + options.domain + ";" : "") + "\n       " + ((options === null || options === void 0 ? void 0 : options.path) ? "Path=" + options.path + ";" : "") + "\n       " + ((options === null || options === void 0 ? void 0 : options.secure) ? "Secure;" : "") + "\n       " + ((options === null || options === void 0 ? void 0 : options.httpOnly) ? "HttpOnly;" : "")).trim());
    };
    Response.prototype.removeCookie = function (cookieName) {
        this.rawResponse.setHeader("Set-Cookie", cookieName + "=; Path=/; Expires=" + new Date(1).toUTCString());
    };
    Response.prototype.end = function (data) {
        this.rawResponse.end(data);
    };
    return Response;
}());
exports.default = Response;
