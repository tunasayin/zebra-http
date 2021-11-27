/// <reference types="node" />
import http from "http";
import https from "https";
import AppOptions from "./AppOptions";
export default class App {
    server: {
        http: http.Server;
        https: https.Server;
    };
    port: number;
    constructor({ debug, port }: AppOptions);
    start(p: number): void;
}
