import { HTTPMethods } from "../constants";
import Response from "./Response";
import Request from "./Request";
import { RouteFunction, RouteFunctionExecute } from "./RouteFuncition";

export default class Route {
  path: string;
  routeFunctions: RouteFunction[];

  constructor(
    path: string,
    methods: HTTPMethods[],
    routeFunction: RouteFunctionExecute
  ) {
    this.path = path.trim();
    this.routeFunctions = [new RouteFunction(methods, routeFunction)];
  }

  getAvailableMethods(): HTTPMethods[] {
    const methods: HTTPMethods[] = [];
    this.routeFunctions.forEach((routeFunc) => {
      routeFunc.methods.forEach((method) => {
        if (!methods.includes(method)) methods.push(method);
      });
    });

    return methods;
  }

  executeRelatedRoutes(method: HTTPMethods, req: Request, res: Response) {
    for (var i = 0; i < this.routeFunctions.length; i++) {
      if (this.routeFunctions[i].methods.includes(method)) {
        this.routeFunctions[i].execute(req, res);
      }
    }
  }
}
