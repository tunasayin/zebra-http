/// <reference types="node" />
import http from "http";
export default class Response {
    private rawResponse;
    constructor(res: http.ServerResponse);
    setStatus(status: number): this;
    send(data: string): this;
    sendFile(filePath: string): this;
    end(data?: any): null;
}
