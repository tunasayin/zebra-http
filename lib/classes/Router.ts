import Route from "./Route";
import { RouteFunctionExecute, HTTPMethods, RouterArgs } from "../constants";

class Router {
  path: string;
  routes: Route[];

  constructor({ path }: RouterArgs) {
    this.path = path;
    this.routes = [];
  }

  get(route: string, routeFunction: RouteFunctionExecute) {
    this.routes.push(new Route(route, [HTTPMethods.GET], routeFunction));
  }

  head(route: string, routeFunction: RouteFunctionExecute) {
    this.routes.push(new Route(route, [HTTPMethods.HEAD], routeFunction));
  }

  post(route: string, routeFunction: RouteFunctionExecute) {
    this.routes.push(new Route(route, [HTTPMethods.POST], routeFunction));
  }

  put(route: string, routeFunction: RouteFunctionExecute) {
    this.routes.push(new Route(route, [HTTPMethods.PUT], routeFunction));
  }

  delete(route: string, routeFunction: RouteFunctionExecute) {
    this.routes.push(new Route(route, [HTTPMethods.DELETE], routeFunction));
  }

  patch(route: string, routeFunction: RouteFunctionExecute) {
    this.routes.push(new Route(route, [HTTPMethods.PATCH], routeFunction));
  }

  all(route: string, routeFunction: RouteFunctionExecute) {
    const methodsArray = [
      ...Object.getOwnPropertyNames(HTTPMethods),
    ] as HTTPMethods[];

    this.routes.push(new Route(route, [HTTPMethods.GET], routeFunction));
  }
}

export default Router;
