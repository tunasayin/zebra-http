import Route from "./Route";
import { HTTPMethods } from "..";
export default class RouteManager {
    routes: Route[];
    constructor();
    createRoute(methods: HTTPMethods[] | HTTPMethods, routeFunction: (req: any, res: any) => void): Route;
    private _handleRoute;
}
