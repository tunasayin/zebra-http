/// <reference types="node" />
import http from "http";
import { HTTPMethods } from "..";
export default class Request {
    private rawRequest;
    method: HTTPMethods;
    path: string | undefined;
    constructor(res: http.IncomingMessage);
}
