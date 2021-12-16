/// <reference types="node" />
import http from "http";
import https from "https";
import AppOptions from "./AppOptions";
import RouteManager from "./RouteManager";
import Static from "./StaticRoute";
import StaticRoute from "./StaticRoute";
import { RouteFunctionExecute } from "./RouteFuncition";
export default class App extends RouteManager {
    protected servers: {
        http: http.Server;
        https: https.Server | null;
    };
    readonly ports: {
        http: number | null;
        https: number | null;
    };
    readonly debug: boolean;
    readonly keys: {
        key: string;
        cert: string;
        ca: string;
    } | null;
    readonly staticRoutes: Static[];
    constructor({ debug, useSSL, keys }: AppOptions);
    start(httpPort: number, started?: () => void): void;
    private _handleRequest;
    serve(urlPath: string, folderPath: string): StaticRoute;
    get(route: string, routeFunction: RouteFunctionExecute): void;
    head(route: string, routeFunction: RouteFunctionExecute): void;
    post(route: string, routeFunction: RouteFunctionExecute): void;
    put(route: string, routeFunction: RouteFunctionExecute): void;
    delete(route: string, routeFunction: RouteFunctionExecute): void;
    patch(route: string, routeFunction: RouteFunctionExecute): void;
    all(route: string, routeFunction: RouteFunctionExecute): void;
}
