import Route from "./Route";
import Response from "./Response";
import Request from "./Request";
import StaticRoute from "./StaticRoute";
import { HTTPMethods } from "../constants";
export default class RouteManager {
    debug: boolean;
    routes: Route[];
    constructor(debug: boolean);
    registerRoute(path: string, methods: HTTPMethods[] | HTTPMethods, routeFunction: (req: any, res: any) => void): Route;
    _handleRoute(req: Request, res: Response, staticRoutes: StaticRoute[]): Promise<void>;
    _handleRouteError(res: Response, err: Error): Promise<void>;
    handleStaticRoteError(res: Response): Promise<void>;
}
