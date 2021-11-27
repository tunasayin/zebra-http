/// <reference types="node" />
import http from "http";
export default class Response {
    private rawResponse;
    constructor(res: http.ServerResponse);
    setStatus(status: number): void;
    sendFile(filePath: string): void;
    end(data?: any): void;
}
