import fs from "fs";
import path from "path";

import Route from "./Route";
import Response from "./Response";
import Request from "./Request";

import { HTTPMethods } from "..";

export default class RouteManager {
  debug: boolean;
  routes: Route[];

  constructor(debug: boolean) {
    this.debug = debug;
    this.routes = [];
  }

  public registerRoute(
    path: string,
    methods: HTTPMethods[] | HTTPMethods,
    routeFunction: (req: any, res: any) => void
  ): Route {
    if (!path.startsWith("/"))
      throw new Error(
        "Invalid path name was specified while registering route!"
      );

    if (!Array.isArray(methods)) {
      methods = [methods];
    }

    if (!routeFunction)
      throw new Error("Cannot create a route without a route function!");

    for (var i = 0; i < methods.length; i++) {
      if (!HTTPMethods[methods[i]])
        throw new Error(
          "Invalid method was specified while registering route!"
        );
    }

    const route = new Route(path, methods, routeFunction);

    this.routes.push(route);

    return route;
  }

  async _handleRoute(req: Request, res: Response) {
    const route = this.routes.find((x) => x.path === req.path);

    if (route?.methods.includes(req.method)) {
      try {
        if (this.debug)
          console.log(
            `\x1b[32m[hTunaTP]\x1b[0m: Recieved, a request executing route ${route.path}.`
          );

        route?.exec(req, res);
      } catch (err: any) {
        this._handleRouteError(res, err);
      }
    }
  }

  async _handleRouteError(res: Response, err: Error): Promise<void> {
    if (!this.debug) return;

    const html = await fs.readFileSync(
      path.join(__dirname, "..", "..", "templates", "error.html"),
      "utf-8"
    );

    const parsedHTML = html
      .replace("$error_name", err.name)
      .replace("$error_message", err.message)
      .replace(
        "$error_stack",
        err.stack
          ? err.stack
              .toString()
              .replace(err.name, "")
              .replace(err.message, "")
              .replace(": ", "")
          : "None"
      );

    res.sendHTML(parsedHTML).end();
  }
}
