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
    Response.prototype.send = function (data) {
        this.rawResponse.write(data);
        return this;
    };
    Response.prototype.sendFile = function (filePath) {
        this.rawResponse.write(fs_1.default.readFileSync(filePath, "utf-8"));
        return this;
    };
    Response.prototype.end = function (data) {
        this.rawResponse.end(data);
        return null;
    };
    return Response;
}());
exports.default = Response;