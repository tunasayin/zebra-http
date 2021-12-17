import Response from "./Response";
import Request from "./Request";
import RouteFunction from "./RouteFuncition";
import { RouteFunctionExecute, HTTPMethods } from "../constants";
export default class Route {
    path: string;
    routeFunctions: RouteFunction[];
    constructor(path: string, methods: HTTPMethods[], routeFunction: RouteFunctionExecute);
    getAvailableMethods(): HTTPMethods[];
    executeRelatedRoutes(method: HTTPMethods, req: Request, res: Response): void;
}
