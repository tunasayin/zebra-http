/// <reference types="node" />
import http from "http";
import { HTTPMethods } from "../constants";
export default class Request {
    rawRequest: http.IncomingMessage;
    method: HTTPMethods;
    path: string | undefined;
    body: object | string | undefined;
    cookies: object;
    constructor(req: http.IncomingMessage);
    getCookie(cookieName: string): string | null;
}
