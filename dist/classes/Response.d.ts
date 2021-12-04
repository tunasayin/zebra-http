/// <reference types="node" />
import http from "http";
export default class Response {
    rawResponse: http.ServerResponse;
    constructor(res: http.ServerResponse);
    setStatus(status: number): this;
    sendText(data: string): this;
    sendHTML(htmlData: string): this;
    sendJSON(jsonData: object): this;
    sendFile(filePath: string): this;
    end(data?: any): void;
}
