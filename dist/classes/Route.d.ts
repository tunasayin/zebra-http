import { HTTPMethods } from "../constants";
import Response from "./Response";
import Request from "./Request";
import { RouteFunction, RouteFunctionExecute } from "./RouteFuncition";
export default class Route {
    path: string;
    routeFunctions: RouteFunction[];
    constructor(path: string, methods: HTTPMethods[], routeFunction: RouteFunctionExecute);
    getAvailableMethods(): HTTPMethods[];
    executeRelatedRoutes(method: HTTPMethods, req: Request, res: Response): void;
}
