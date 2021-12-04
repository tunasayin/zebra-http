/// <reference types="node" />
import http from "http";
interface SetCookieOptions {
    maxAge?: number;
    expires: Date;
    domain?: string;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
}
export default class Response {
    rawResponse: http.ServerResponse;
    constructor(res: http.ServerResponse);
    setStatus(status: number): this;
    sendText(data: string): this;
    sendHTML(htmlData: string): this;
    sendJSON(jsonData: object): this;
    sendFile(filePath: string): this;
    setCookie(cookieName: string, cookieValue: string, options?: SetCookieOptions): void;
    removeCookie(cookieName: string): void;
    end(data?: any): void;
}
export {};
