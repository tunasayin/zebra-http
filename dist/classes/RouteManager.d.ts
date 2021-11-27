import Route from "./Route";
import { HTTPMethods } from "..";
export default class RouteManager {
    routes: Route[];
    constructor();
    registerRoute(path: string, methods: HTTPMethods[] | HTTPMethods, routeFunction: (req: any, res: any) => void): Route;
}
