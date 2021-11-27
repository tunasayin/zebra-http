"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Request = (function () {
    function Request(res) {
        this.rawRequest = res;
        this.method = this.rawRequest.method || __1.HTTPMethods.GET;
        this.path = this.rawRequest.url;
    }
    return Request;
}());
exports.default = Request;
