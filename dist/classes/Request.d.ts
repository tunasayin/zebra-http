/// <reference types="node" />
import http from "http";
import { HTTPMethods } from "..";
export default class Request {
    rawRequest: http.IncomingMessage;
    method: HTTPMethods;
    path: string | undefined;
    constructor(res: http.IncomingMessage);
}
