import Route from "./Route";
import { HTTPMethods } from "..";

export default class RouteManager {
  routes: Route[];

  constructor() {
    this.routes = [];
  }

  public registerRoute(
    path: string,
    methods: HTTPMethods[] | HTTPMethods,
    routeFunction: (req: any, res: any) => void
  ): Route {
    if (!Array.isArray(methods)) {
      methods = [methods];
    }

    const route = new Route(path, methods, routeFunction);

    this.routes.push(route);

    return route;
  }
}
