import Route from "./Route";
import Response from "./Response";
import Request from "./Request";
import { HTTPMethods } from "..";
import StaticRoute from "./StaticRoute";
export default class RouteManager {
    debug: boolean;
    routes: Route[];
    constructor(debug: boolean);
    registerRoute(path: string, methods: HTTPMethods[] | HTTPMethods, routeFunction: (req: any, res: any) => void): Route;
    _handleRoute(req: Request, res: Response, staticRoutes: StaticRoute[]): Promise<void>;
    _handleRouteError(res: Response, err: Error): Promise<void>;
}
